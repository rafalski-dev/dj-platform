"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { adminCheck } from "@/lib/auth-helpers";
import { buildContractPdf } from "@/lib/contractPdf";
import { db } from "@/lib/db";
import { getDbErrorKind } from "@/lib/prismaErrors";
import { r2 } from "@/lib/r2";
import { formatZodErrors } from "@/lib/utils";
import { createContractSchema, CreateContractSchema } from "@/validation/contracts";
import { getTranslations } from "next-intl/server";

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

  try {
    await db.$transaction(async (tx) => {
      const contract = await tx.contract.create({
        data: { eventId: event.id },
        select: { id: true, number: true, createdAt: true },
      });

      const year = contract.createdAt.getFullYear();
      const number = String(contract.number).padStart(4, "0");

      await tx.contract.update({
        where: { id: contract.id },
        data: { contractNumber: `NC/${year}/${number}` },
      });
    });
  } catch (err) {
    if (getDbErrorKind(err) === "duplicate")
      return { success: false, status: "duplicate", message: t("serverMessage.taken") };

    console.error(err);
    return { success: false, status: "error", message: t("serverMessage.unknown") };
  }

  return { success: true, status: "success", message: t("serverMessage.success") };
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
    select: { status: true, contractNumber: true },
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

  return {
    success: true,
    status: "success",
    message: t("success", { number: contract.contractNumber ?? "" }),
  };
}
