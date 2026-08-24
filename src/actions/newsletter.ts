"use server";
import "server-only";
import { resend } from "@/lib/resend";
import { State } from "@/types/newsletter";
import z from "zod";
import { getTranslations } from "next-intl/server";
import { createNewsletterSchema } from "@/validation/newsletter";

export async function handleSubmit(prevState: State, formData: FormData): Promise<State> {
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
