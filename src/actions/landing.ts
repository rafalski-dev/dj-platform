"use server";

import { EmailTemplate } from "@/templates/emails/emailTemplate";
import { resend } from "@/lib/resend";
import { eventTypeKeys } from "@/constants/contact";
import { isDateAvailable } from "@/data/events";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { dateFormatter } from "@/lib/utils";
import { CheckDateResult, ContactFormResult } from "@/types/contact";
import { State } from "@/types/newsletter";
import {
  ContactSchema,
  createContactSchema,
  createEventDateSchema,
  createNewsletterSchema,
} from "@/validation/landing";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { getLocale, getTranslations } from "next-intl/server";
import z from "zod";

export async function checkDateAction(date: Date): Promise<CheckDateResult> {
  const t = await getTranslations("LandingPage.Contact.contactForm");

  const limit = await rateLimit("checkDate");
  if (!limit.allowed)
    return {
      success: false,
      status: "rateLimited",
      message: t("serverMessage.tooManyRequests", {
        minutes: limit.retryAfterMinutes,
        phone: siteConfig.contact.number,
      }),
    };

  const result = createEventDateSchema(t).safeParse(date);

  if (!result.success)
    return { success: false, status: "invalid", message: result.error.issues[0]?.message };

  try {
    const isFree = await isDateAvailable(result.data);
    return isFree ? { success: true, status: "free" } : { success: false, status: "busy" };
  } catch (err) {
    console.error(err);
    return { success: false, status: "error", message: t("serverMessage.serverError") };
  }
}

export async function sendContactFormAction(formData: ContactSchema): Promise<ContactFormResult> {
  const t = await getTranslations("LandingPage.Contact.contactForm");

  // Before validation and honeypot – every call counts, bots included
  const limit = await rateLimit("inquiry");
  if (!limit.allowed)
    return {
      success: false,
      status: "rateLimited",
      message: t("serverMessage.tooManyRequests", {
        minutes: limit.retryAfterMinutes,
        phone: siteConfig.contact.number,
      }),
    };

  const schema = createContactSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      status: "invalid",
      message: t("serverMessage.validationError"),
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { terms, website, ...validatedFormData } = result.data;

  // Honeypot filled → bot. Pretend success, save nothing.
  if (website) return { success: true, status: "success", message: t("serverMessage.success") };

  let inquiryId: string;

  try {
    // The date could have been taken between step 1 and sending the form
    const isFree = await isDateAvailable(validatedFormData.eventDate);
    if (!isFree) return { success: false, status: "busy", message: t("busy.description") };

    ({ id: inquiryId } = await db.inquiry.create({
      data: {
        firstName: validatedFormData.firstName,
        lastName: validatedFormData.lastName,
        email: validatedFormData.email,
        phone: validatedFormData.phone,
        date: dateFormatter(validatedFormData.eventDate).eventDate,
        type: validatedFormData.eventType,
        place: validatedFormData.place,
        message: validatedFormData.message || null,
        termsAcceptedAt: new Date(),
        locale: await getLocale(),
      },
      select: { id: true },
    }));
  } catch (err) {
    console.error(err);
    return { success: false, status: "error", message: t("serverMessage.serverError") };
  }

  // The inquiry is already saved – a failed notification email must not fail the form
  try {
    const labelKey = eventTypeKeys.find(
      ({ value }) => value === validatedFormData.eventType,
    )?.labelKey;

    // The DJ opens it in the admin panel (in the default language) – accept / reject are there
    const inquiryPath = getPathname({
      href: { pathname: "/admin/inquiries/[inquiryId]", params: { inquiryId } },
      locale: routing.defaultLocale,
    });

    // Sent from the landing page and from the client panel – so no "website" in it
    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <contact@rafalski.dev>`,
      to: ["contact@rafalski.dev"],
      replyTo: validatedFormData.email,
      subject: `New booking enquiry – ${validatedFormData.firstName} ${validatedFormData.lastName}`,
      react: EmailTemplate({
        ...validatedFormData,
        fullName: `${validatedFormData.firstName} ${validatedFormData.lastName}`,
        // Server may run in UTC – format in Warsaw time so the day doesn't shift
        eventDate: format(new TZDate(validatedFormData.eventDate, "Europe/Warsaw"), "dd.MM.yyyy"),
        eventType: labelKey ? t(`formInputs.eventType.options.${labelKey}`) : "—",
        inquiryUrl: `${process.env.BETTER_AUTH_URL}${inquiryPath}`,
      }),
    });

    if (error) console.error("Inquiry notification email failed", error);
  } catch (err) {
    console.error("Inquiry notification email failed", err);
  }

  return { success: true, status: "success", message: t("serverMessage.success") };
}

export async function subscribeNewsletterAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const t = await getTranslations("LandingPage.Newsletter");
  const schema = createNewsletterSchema(t("errors.emptyEmail"), t("errors.invalidEmail"));
  const email = formData.get("email")?.toString().trim() ?? "";

  const limit = await rateLimit("newsletter");
  if (!limit.allowed)
    return {
      ...prevState,
      providedEmail: email,
      errors: null,
      status: "error",
      serverError: t("tooManyRequests", { minutes: limit.retryAfterMinutes }),
    };

  const result = schema.safeParse({
    email,
  });

  if (!result.success) {
    return {
      ...prevState,
      status: "error",
      providedEmail: email,
      errors: z.flattenError(result.error).fieldErrors,
      serverError: undefined,
    };
  }

  try {
    const resendData = {
      email: result.data.email,
      unsubscribed: false,
    };

    const { error } = await resend.contacts.create(resendData);

    if (error) {
      return {
        ...prevState,
        providedEmail: email,
        errors: null,
        status: "error",
        serverError: t("fetchingError"),
      };
    }

    return {
      ...prevState,
      providedEmail: undefined,
      errors: null,
      status: "success",
      serverError: undefined,
    };
  } catch (err) {
    console.error("Newsletter subscribe failed", err);
    return {
      ...prevState,
      providedEmail: email,
      errors: null,
      status: "error",
      serverError: t("serverError"),
    };
  }
}
