import { useTranslations } from "next-intl";
import z from "zod";

type ResetPasswordType = ReturnType<typeof useTranslations<"Auth">>;

export function createResetPasswordSchema(t: ResetPasswordType) {
  return z.object({
    email: z
      .string()
      .min(1, { error: t("ResetPassword.form.email.required") })
      .email({ error: t("ResetPassword.form.email.error") }),
  });
}
