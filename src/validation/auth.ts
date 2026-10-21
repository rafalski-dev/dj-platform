import { useTranslations } from "next-intl";
import { passwordRegex } from "@/constants/auth";

import z from "zod";

type LoginType = ReturnType<typeof useTranslations<"Auth">>;

export function createLoginSchema(t: LoginType) {
  return z.object({
    email: z
      .string()
      .min(1, { error: t("Login.form.email.required") })
      .email({ error: t("Login.form.email.error") }),
    password: z.string().min(1, { error: t("Login.form.password.required") }),
    rememberMe: z.boolean(),
  });
}

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

type ResetPasswordType = ReturnType<typeof useTranslations<"Auth">>;

export function createResetPasswordSchema(t: ResetPasswordType) {
  return z.object({
    email: z
      .string()
      .min(1, { error: t("ResetPassword.form.email.required") })
      .email({ error: t("ResetPassword.form.email.error") }),
  });
}
