import { passwordRegex } from "@/constants/auth";
import { useTranslations } from "next-intl";
import z from "zod";

type RegisterTranslator = ReturnType<typeof useTranslations<"Auth">>;

export function createRegisterSchema(t: RegisterTranslator) {
  return z
    .object({
      firstName: z
        .string()
        .trim()
        .min(1, { error: t("Register.form.firstName.required") }),
      lastName: z
        .string()
        .trim()
        .min(1, { error: t("Register.form.lastName.required") }),
      email: z
        .string()
        .trim()
        .min(1, { error: t("Register.form.email.required") })
        .email({ error: t("Register.form.email.error") }),
      password: z
        .string()
        .min(1, { error: t("Register.form.password.required") })
        .regex(passwordRegex, { error: t("Register.form.password.error") }),
      confirmPassword: z.string(),
      terms: z
        .boolean()
        .refine((val) => val === true, { error: t("Register.form.terms.required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: t("Register.form.confirmPassword.error"),
      path: ["confirmPassword"],
    });
}
