import { passwordRegex } from "@/constants/auth";
import { useTranslations } from "next-intl";
import z from "zod";

type NewPasswordType = ReturnType<typeof useTranslations<"Auth">>;

export function createNewPasswordSchema(t: NewPasswordType) {
  return z
    .object({
      password: z
        .string()
        .min(1, { error: t("NewPassword.form.password.required") })
        .regex(passwordRegex, { error: t("NewPassword.form.password.error") }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: t("NewPassword.form.confirmPassword.error"),
      path: ["confirmPassword"],
    });
}
