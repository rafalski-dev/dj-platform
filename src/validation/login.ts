import { useTranslations } from "next-intl";
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
