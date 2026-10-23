"use server";

import { EmailTemplate } from "@/emails/emailTemplate";
import { resend } from "@/lib/resend";
import { ContactFormResult } from "@/types/contact";
import { State } from "@/types/newsletter";
import { ContactSchema, createContactSchema, createNewsletterSchema } from "@/validation/landing";
import { getTranslations } from "next-intl/server";
import z from "zod";

export async function sendContactFormAction(formData: ContactSchema): Promise<ContactFormResult> {
  const t = await getTranslations("LandingPage.Contact.contactForm");
  const schema = createContactSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: t("serverMessage.validationError"),
      errors: z.flattenError(result.error).fieldErrors,
    };
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { terms, ...validatedFormData } = result.data;
    const translatedFormData = {
      ...validatedFormData,
      eventType: t(`formInputs.eventType.options.${validatedFormData.eventType}`),
    };
    const { error } = await resend.emails.send({
      from: "Website enquiry <contact@rafalski.dev>",
      to: ["contact@rafalski.dev"],
      replyTo: translatedFormData.email,
      subject: "Website enquiry",
      react: EmailTemplate(translatedFormData),
    });

    if (error) {
      return {
        success: false,
        message: t("serverMessage.sendingError"),
      };
    }

    return { success: true, message: t("serverMessage.success") };
  } catch (err) {
    console.error(err);
    return { success: false, message: t("serverMessage.serverError") };
  }
}

export async function subscribeNewsletterAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const t = await getTranslations("LandingPage.Newsletter");
  const schema = createNewsletterSchema(t("errors.emptyEmail"), t("errors.invalidEmail"));
  const email = formData.get("email")?.toString().trim() ?? "";

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
