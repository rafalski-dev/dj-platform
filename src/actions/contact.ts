"use server";

import { EmailTemplate } from "@/components/template/emailTemplate";
import { resend } from "@/lib/resend";
import { ContactFormResult } from "@/types/contact";
import { ContactSchema, createContactSchema } from "@/validation/contact";
import { getTranslations } from "next-intl/server";
import z from "zod";

export async function handleContactForm(formData: ContactSchema): Promise<ContactFormResult> {
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
