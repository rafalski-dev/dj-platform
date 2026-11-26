"use server";

import { DeleteObjectCommand, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  SELECTED_EVENT_COOKIE,
  SIGNED_CONTRACT_MAX_SIZE,
  SIGNED_CONTRACT_TYPES,
  SignedContractType,
} from "@/constants/dashboard";
import { getClientEventOptions, getOptionValue } from "@/data/dashboard";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { r2 } from "@/lib/r2";
import { dateFormatter, formatZodErrors } from "@/lib/utils";
import {
  eventDetailsSchema,
  EventDetailsType,
  myDetailsSchema,
  MyDetailsType,
  weddingDetailsSchema,
  WeddingDetailsType,
} from "@/validation/dashboard";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { resend } from "@/lib/resend";
import { ForeignUserTemplate } from "@/templates/emails/foreignUserTemplate";
import { render } from "@react-email/render";

// Setting a cookie in an action re-renders the current page → it shows the new event
export async function selectEventAction(value: string) {
  const options = await getClientEventOptions();
  const isOwnOption = options.some((option) => getOptionValue(option) === value);

  if (!isOwnOption) return { success: false, status: "notFound" };

  (await cookies()).set(SELECTED_EVENT_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return { success: true, status: "success" };
}

// The client edits only their own record – found by the logged-in user, never by an id from the form
export async function myDetailsAction(formData: MyDetailsType) {
  const session = await getSession();
  const t = await getTranslations("Dashboard.Account");
  if (!session) return { success: false, status: "invalidAuth", message: t("details.error") };

  const schema = myDetailsSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      status: "invalid",
      message: t("details.invalid"),
      errors: formatZodErrors(result.error),
    };
  }

  try {
    const client = await db.client.findUnique({
      where: { userId: session.user.id },
      select: { clientType: true },
    });
    if (!client) return { success: false, status: "notFound", message: t("details.error") };
    const details = result.data;

    // Same as clientDataFormatter: a private client's name is their full name,
    // a business keeps its business name
    const data = {
      ...details,
      ...(client.clientType === "Individual" && {
        name: `${details.firstName} ${details.lastName}`,
      }),
      phone: details.phone || null,
      region: details.region || null,
      country: details.country || null,
    };

    await db.client.update({ where: { userId: session.user.id }, data });

    return { success: true, status: "success", message: t("details.saved") };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("details.error") };
  }
}

// The id comes from the form, so the event is checked against the logged-in user first
export async function eventDetailsAction(eventId: string, formData: EventDetailsType) {
  const session = await getSession();
  const t = await getTranslations("Dashboard.EventEdit");
  if (!session) return { success: false, status: "invalidAuth", message: t("error") };

  const result = eventDetailsSchema(t).safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      status: "invalid",
      message: t("invalid"),
      errors: formatZodErrors(result.error),
    };
  }

  try {
    const event = await db.event.findFirst({
      where: { id: eventId, client: { userId: session.user.id } },
      select: { date: true, wedding: { select: { weddingKind: true, ceremonyStartsAt: true } } },
    });
    if (!event) return { success: false, status: "notFound", message: t("error") };

    // the ceremony card is only there for a wedding with a ceremony – then it must come filled in
    const wedding = event.wedding?.weddingKind !== "None" ? event.wedding : null;
    const { ceremony } = result.data;
    if (wedding && !ceremony) return { success: false, status: "invalid", message: t("invalid") };

    // same as the admin form – an end before the start means the party goes past midnight
    const { eventStartTime, eventEndTime } = dateFormatter(
      event.date,
      result.data.startTime,
      result.data.endTime,
    );

    await db.event.update({
      where: { id: eventId },
      data: {
        startsAt: eventStartTime,
        endsAt: eventEndTime,
        address: result.data.address,
        // the ceremony day stays as the DJ set it (it can be before the party) – only the time changes
        ...(wedding &&
          ceremony && {
            wedding: {
              update: {
                ceremonyStartsAt: dateFormatter(
                  wedding.ceremonyStartsAt ?? event.date,
                  ceremony.startTime,
                ).eventStartTime,
                ceremonyPlace: ceremony.place,
                ceremonyAddress: ceremony.address,
              },
            },
          }),
      },
    });

    return { success: true, status: "success", message: t("saved") };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("error") };
  }
}

// The couple's people for the DJ (speeches, toasts) – only for the client's own wedding.
// A wedding from an inquiry has no details row yet – it's created here with no ceremony;
// the DJ sets the ceremony kind in the admin panel.
export async function weddingDetailsAction(eventId: string, formData: WeddingDetailsType) {
  const session = await getSession();
  const t = await getTranslations("Dashboard.WeddingEdit");
  if (!session) return { success: false, status: "invalidAuth", message: t("error") };

  const result = weddingDetailsSchema(t).safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      status: "invalid",
      message: t("invalid"),
      errors: formatZodErrors(result.error),
    };
  }

  // empty optional fields are stored as null, like in the admin form
  const { data: values } = result;
  const data = {
    bride: values.bride,
    groom: values.groom,
    brideWitness: values.brideWitness || null,
    groomWitness: values.groomWitness || null,
    brideMother: values.brideMother || null,
    brideFather: values.brideFather || null,
    groomMother: values.groomMother || null,
    groomFather: values.groomFather || null,
  };

  try {
    const event = await db.event.findFirst({
      where: { id: eventId, type: "Wedding", client: { userId: session.user.id } },
      select: { id: true },
    });
    if (!event) return { success: false, status: "notFound", message: t("error") };

    await db.weddingDetails.upsert({
      where: { eventId: event.id },
      create: { ...data, eventId: event.id, weddingKind: "None" },
      update: data,
    });

    return { success: true, status: "success", message: t("saved") };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("error") };
  }
}

// Signed contract, step 1: the client asks for a short-lived link and uploads the file
// straight to R2 (a server action can take only 1 MB). Same owner check as the download route.
export async function signedContractUploadUrlAction(
  contractId: string,
  contentType: SignedContractType,
  size: number,
) {
  const session = await getSession();
  const t = await getTranslations("Dashboard.Contract.card.upload.serverMessage");
  if (!session) return { success: false, status: "invalidAuth", message: t("unknown") };

  // the arguments come straight from the browser – check them like form data
  if (!Object.hasOwn(SIGNED_CONTRACT_TYPES, contentType))
    return { success: false, status: "invalid", message: t("type") };
  if (!Number.isInteger(size) || size <= 0 || size > SIGNED_CONTRACT_MAX_SIZE)
    return { success: false, status: "invalid", message: t("size") };

  const extension = SIGNED_CONTRACT_TYPES[contentType];

  const contract = await getUploadableContract(contractId, session.user.id);
  if (!contract) return { success: false, status: "notFound", message: t("notFound") };

  const fileKey = `contracts/${contract.id}-signed.${extension}`;

  try {
    // type and size are part of the signature – R2 rejects any other file
    const url = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: fileKey,
        ContentType: contentType,
        ContentLength: size,
      }),
      { expiresIn: 300 },
    );

    return { success: true, status: "success", url, fileKey };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("unknown") };
  }
}

// Signed contract, step 2: after the upload, check the file really is in R2 and mark the
// contract as signed. A new file replaces the old one until the DJ accepts it.
export async function signedContractConfirmAction(contractId: string, fileKey: string) {
  const session = await getSession();
  const t = await getTranslations("Dashboard.Contract.card.upload.serverMessage");
  if (!session) return { success: false, status: "invalidAuth", message: t("unknown") };

  const contract = await getUploadableContract(contractId, session.user.id);
  if (!contract) return { success: false, status: "notFound", message: t("notFound") };

  // only the keys step 1 can hand out for this contract
  const allowedKeys = Object.values(SIGNED_CONTRACT_TYPES).map(
    (extension) => `contracts/${contract.id}-signed.${extension}`,
  );
  if (!allowedKeys.includes(fileKey))
    return { success: false, status: "invalid", message: t("unknown") };

  try {
    await r2.send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET, Key: fileKey }));

    await db.contract.update({
      where: { id: contract.id },
      data: { status: "Signed", signedAt: new Date(), signedFileKey: fileKey },
    });

    // a PDF replacing a photo (or the other way round) leaves the old file behind
    if (contract.signedFileKey && contract.signedFileKey !== fileKey)
      await r2.send(
        new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET, Key: contract.signedFileKey }),
      );
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("unknown") };
  }

  // the client's part is done either way – the DJ can still see it in the panel
  await sendSignedContractEmail(contract);

  return { success: true, status: "success", message: t("success") };
}

// To the DJ (same inbox as new enquiries): "the client sent the signed contract – check and confirm it".
// Admin emails are in English, like the enquiry email.
async function sendSignedContractEmail(contract: UploadableContract) {
  const replaced = !!contract.signedFileKey;
  const contractUrl = `${process.env.BETTER_AUTH_URL}${getPathname({
    href: { pathname: "/admin/contracts/[contractId]", params: { contractId: contract.id } },
    locale: "en",
  })}`;

  try {
    const email = ForeignUserTemplate({
      locale: "en",
      preview: `${contract.event.client.name} sent the signed contract ${contract.contractNumber ?? ""}`,
      heading: replaced ? "Signed contract replaced" : "Signed contract received",
      paragraphs: [
        `${contract.event.client.name} has ${replaced ? "replaced" : "sent"} the signed copy of contract ${contract.contractNumber ?? ""} (${contract.event.name}).`,
        "Check the file and confirm the contract to finish.",
      ],
      button: { label: "Review contract", url: contractUrl },
    });

    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <contact@rafalski.dev>`,
      to: ["contact@rafalski.dev"],
      subject: `Signed contract ${contract.contractNumber ?? ""} – ${contract.event.client.name}`,
      react: email,
      text: await render(email, { plainText: true }),
    });

    if (error) console.error("sendSignedContractEmail:", error);
  } catch (error) {
    console.error("sendSignedContractEmail:", error);
  }
}

// The client's own contract that still takes a signed copy: sent, or signed but not accepted yet
async function getUploadableContract(contractId: string, userId: string) {
  return await db.contract.findFirst({
    where: {
      id: contractId,
      status: { in: ["Sent", "Signed"] },
      event: { client: { userId } },
    },
    select: {
      id: true,
      signedFileKey: true,
      contractNumber: true,
      event: { select: { name: true, client: { select: { name: true } } } },
    },
  });
}

type UploadableContract = NonNullable<Awaited<ReturnType<typeof getUploadableContract>>>;
