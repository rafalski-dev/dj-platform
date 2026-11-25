"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { adminCheck } from "@/lib/auth-helpers";
import { buildContractPdf } from "@/lib/contractPdf";
import { db } from "@/lib/db";
import { getDbErrorKind } from "@/lib/prismaErrors";
import { r2 } from "@/lib/r2";
import { formatZodErrors } from "@/lib/utils";
import { createContractSchema, CreateContractSchema } from "@/validation/contracts";
import { getFormatter, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { resend } from "@/lib/resend";
import { ForeignUserTemplate } from "@/templates/emails/foreignUserTemplate";
import { render } from "@react-email/render";

export async function createContractAction(formData: CreateContractSchema) {
  await adminCheck();
  const t = await getTranslations("Admin.Contracts.Form");
  const schema = createContractSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success)
    return {
      success: false,
      status: "invalid",
      message: t("serverMessage.invalid"),
      errors: formatZodErrors(result.error),
    };

  const event = await db.event.findFirst({
    where: {
      id: result.data.event,
      clientId: result.data.client.value,
      status: { not: "Cancelled" },
    },
    select: { id: true },
  });

  if (!event) return { success: false, status: "invalid", message: t("serverMessage.invalid") };

  // the new contract's id – the form opens its page right after saving
  let contractId: string;

  try {
    contractId = await db.$transaction(async (tx) => {
      const contract = await tx.contract.create({
        data: { eventId: event.id, price: Number(result.data.price) },
        select: { id: true, number: true, createdAt: true },
      });

      const year = contract.createdAt.getFullYear();
      const number = String(contract.number).padStart(4, "0");

      await tx.contract.update({
        where: { id: contract.id },
        data: { contractNumber: `NC/${year}/${number}` },
      });

      return contract.id;
    });
  } catch (err) {
    if (getDbErrorKind(err) === "duplicate")
      return { success: false, status: "duplicate", message: t("serverMessage.taken") };

    console.error(err);
    return { success: false, status: "error", message: t("serverMessage.unknown") };
  }

  return { success: true, status: "success", message: t("serverMessage.success"), contractId };
}

export async function deleteContractAction(contractId: string) {
  await adminCheck();
  const t = await getTranslations("Admin.Contracts.Details.delete.serverMessage");

  let contractNumber: string;

  try {
    const contract = await db.contract.delete({ where: { id: contractId } });
    contractNumber = contract.contractNumber ?? "";
  } catch (error) {
    console.error(error);
    const kind = getDbErrorKind(error);
    return { status: "error", success: false, message: t(kind === "duplicate" ? "unknown" : kind) };
  }

  return { status: "success", success: true, message: t("success", { number: contractNumber }) };
}

export async function sendContractAction(contractId: string) {
  const session = await adminCheck();
  const t = await getTranslations("Admin.Contracts.Details.send.serverMessage");

  const contract = await db.contract.findUnique({
    where: { id: contractId },
    select: {
      status: true,
      contractNumber: true,
      event: {
        select: { date: true, client: { select: { firstName: true, email: true } } },
      },
    },
  });

  if (!contract) return { success: false, status: "notFound", message: t("notFound") };

  // Only a Draft can be sent – a sent contract is frozen
  if (contract.status !== "Draft")
    return { success: false, status: "invalid", message: t("alreadySent") };

  try {
    const result = await buildContractPdf(contractId, session.user.id);
    if (result.error) return { success: false, status: "invalid", message: t(result.error) };

    // 1. Upload the PDF to the private R2 bucket
    const fileKey = `contracts/${contractId}.pdf`;
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: fileKey,
        Body: result.pdf,
        ContentType: "application/pdf",
      }),
    );

    // 2. Only after a successful upload mark the contract as sent
    await db.contract.update({
      where: { id: contractId },
      data: { status: "Sent", sentAt: new Date(), fileKey },
    });
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("unknown") };
  }

  // The contract is already sent – a failed email only changes the message for the DJ
  const isEmailSent = await sendContractReadyEmail(contract);
  const number = contract.contractNumber ?? "";

  return {
    success: true,
    status: "success",
    message: isEmailSent ? t("success", { number }) : t("successNoEmail", { number }),
  };
}

// "Your contract is ready" + a button to the contract page in the client panel.
// Clients have no saved language – the default (Polish) is used.
async function sendContractReadyEmail(contract: {
  contractNumber: string | null;
  event: { date: Date; client: { firstName: string; email: string | null } };
}) {
  const { client, date } = contract.event;
  if (!client.email) return false;

  const locale = routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Emails.ContractSent" });
  const format = await getFormatter({ locale });

  // Server may run in UTC – format in Warsaw time so the day doesn't shift
  const eventDate = format.dateTime(date, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Warsaw",
  });

  try {
    const email = ForeignUserTemplate({
      locale,
      preview: t("preview", { date: eventDate }),
      heading: t("heading"),
      paragraphs: [
        t("greeting", { name: client.firstName }),
        t("intro", { date: eventDate }),
        t("steps"),
      ],
      button: {
        label: t("button"),
        url: `${process.env.BETTER_AUTH_URL}${getPathname({ href: "/dashboard/contracts", locale })}`,
      },
      footnote: t("footnote"),
    });

    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <contact@rafalski.dev>`,
      to: client.email,
      subject: t("subject", { number: contract.contractNumber ?? "" }),
      react: email,
      text: await render(email, { plainText: true }),
    });

    if (error) {
      console.error("sendContractReadyEmail:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("sendContractReadyEmail:", error);
    return false;
  }
}

// The last step: the DJ has looked at the signed copy from the client and confirms it.
// After this the client can't replace the file anymore.
export async function acceptContractAction(contractId: string) {
  await adminCheck();
  const t = await getTranslations("Admin.Contracts.Details.accept.serverMessage");

  const contract = await db.contract.findUnique({
    where: { id: contractId },
    select: { status: true, signedFileKey: true, contractNumber: true },
  });

  if (!contract) return { success: false, status: "notFound", message: t("notFound") };

  if (contract.status !== "Signed" || !contract.signedFileKey)
    return { success: false, status: "invalid", message: t("notSigned") };

  try {
    await db.contract.update({
      where: { id: contractId },
      data: { status: "Accepted", acceptedAt: new Date() },
    });
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("unknown") };
  }

  return {
    success: true,
    status: "success",
    message: t("success", { number: contract.contractNumber ?? "" }),
  };
}
