"use server";

import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { resend } from "@/lib/resend";
import { ForeignUserTemplate } from "@/templates/emails/foreignUserTemplate";
import { render } from "@react-email/render";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import type { Inquiry } from "../../generated";

// Thrown inside the transaction to roll it back with a known reason
class InquiryActionError extends Error {
  constructor(public kind: "notFound" | "alreadyHandled" | "dateTaken") {
    super(kind);
  }
}

// One click: find or create the client, create the event with what the inquiry has.
// Hours, address and package stay empty – the DJ fills them in on the event later.
export async function acceptInquiryAction(inquiryId: string) {
  await adminCheck();
  const t = await getTranslations("Admin.Inquiries.Details.accept.serverMessage");
  const tTypes = await getTranslations("Admin.Clients.list.eventTypes");

  let accepted;

  try {
    accepted = await db.$transaction(async (tx) => {
      const inquiry = await tx.inquiry.findUnique({ where: { id: inquiryId } });
      if (!inquiry) throw new InquiryActionError("notFound");
      if (inquiry.status !== "New") throw new InquiryActionError("alreadyHandled");

      const takenEvent = await tx.event.findFirst({
        where: { date: inquiry.date, status: { not: "Cancelled" } },
        select: { id: true },
      });
      if (takenEvent) throw new InquiryActionError("dateTaken");

      const fullName = `${inquiry.firstName} ${inquiry.lastName}`;

      // Same email = the same client (returning client or added by hand)
      const client =
        (await tx.client.findUnique({
          where: { email: inquiry.email },
          select: { id: true, userId: true },
        })) ??
        (await tx.client.create({
          data: {
            clientType: "Individual",
            name: fullName,
            firstName: inquiry.firstName,
            lastName: inquiry.lastName,
            email: inquiry.email,
            phone: inquiry.phone,
          },
          select: { id: true, userId: true },
        }));

      const event = await tx.event.create({
        data: {
          name: `${tTypes(inquiry.type)} – ${fullName}`,
          type: inquiry.type,
          date: inquiry.date,
          place: inquiry.place,
          message: inquiry.message,
          clientId: client.id,
          playlist: { create: {} },
        },
        select: { id: true },
      });

      // updateMany with status: "New" – a second, parallel accept changes nothing
      const { count } = await tx.inquiry.updateMany({
        where: { id: inquiryId, status: "New" },
        data: { status: "Accepted", eventId: event.id },
      });
      if (count === 0) throw new InquiryActionError("alreadyHandled");

      // The client may already have an account (signed up before the inquiry).
      // Verified → link now; not verified → linked by the auth hook after verification.
      const user = client.userId
        ? null
        : await tx.user.findUnique({
            where: { email: inquiry.email },
            select: { id: true, emailVerified: true, role: true, client: { select: { id: true } } },
          });

      if (user?.emailVerified && user.role !== "Admin" && !user.client)
        await tx.client.update({ where: { id: client.id }, data: { userId: user.id } });

      return { eventId: event.id, inquiry, hasAccount: Boolean(client.userId || user) };
    });
  } catch (error) {
    if (error instanceof InquiryActionError)
      return {
        success: false,
        status: error.kind === "notFound" ? "notFound" : "conflict",
        message: t(error.kind),
      };

    console.error(error);
    return { success: false, status: "error", message: t("unknown") };
  }

  // The event already exists – a failed email only changes the message for the DJ
  const isEmailSent = await sendInquiryAcceptedEmail(accepted.inquiry, accepted.hasAccount);

  return {
    success: true,
    status: "success",
    message: t(isEmailSent ? "success" : "successNoEmail"),
    eventId: accepted.eventId,
  };
}

// "Your date is confirmed" + how to get into the client panel.
// No account yet → register with this email; linking happens after email verification.
async function sendInquiryAcceptedEmail(inquiry: Inquiry, hasAccount: boolean) {
  const locale = hasLocale(routing.locales, inquiry.locale)
    ? inquiry.locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Emails.InquiryAccepted" });
  const format = await getFormatter({ locale });

  const date = format.dateTime(inquiry.date, { day: "numeric", month: "long", year: "numeric" });
  const href = hasAccount ? "/login" : "/register";

  try {
    const email = ForeignUserTemplate({
      locale,
      preview: t("preview", { date }),
      heading: t("heading"),
      paragraphs: [
        t("greeting", { name: inquiry.firstName }),
        t("intro", { date }),
        hasAccount ? t("login") : t("register", { email: inquiry.email }),
      ],
      button: {
        label: hasAccount ? t("loginButton") : t("registerButton"),
        url: `${process.env.BETTER_AUTH_URL}${getPathname({ href, locale })}`,
      },
      footnote: t("footnote"),
    });

    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <contact@rafalski.dev>`,
      to: inquiry.email,
      subject: t("subject", { date }),
      react: email,
      text: await render(email, { plainText: true }),
    });

    if (error) {
      console.error("sendInquiryAcceptedEmail:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("sendInquiryAcceptedEmail:", error);
    return false;
  }
}

export async function rejectInquiryAction(inquiryId: string) {
  await adminCheck();
  const t = await getTranslations("Admin.Inquiries.Details.reject.serverMessage");

  try {
    const { count } = await db.inquiry.updateMany({
      where: { id: inquiryId, status: "New" },
      data: { status: "Rejected" },
    });

    if (count === 0) return { success: false, status: "conflict", message: t("alreadyHandled") };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("unknown") };
  }

  return { success: true, status: "success", message: t("success") };
}
