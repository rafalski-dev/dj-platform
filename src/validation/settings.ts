import type { useTranslations } from "next-intl";
import z from "zod";

type SettingsTranslator = ReturnType<typeof useTranslations<"Admin.Settings">>;

export function accountDetailsSchema(t: SettingsTranslator) {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(1, { error: t("fields.fullName.required") })
      .max(100, { error: t("fields.fullName.tooLong") }),
  });
}

export type AccountDetailsType = z.infer<ReturnType<typeof accountDetailsSchema>>;

export function changeEmailSchema(t: SettingsTranslator, currentEmail: string) {
  return z.object({
    newEmail: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, { error: t("fields.email.required") })
      .email({ error: t("fields.email.validation") })
      .refine((val) => val !== currentEmail.toLowerCase(), {
        error: t("fields.email.sameAsCurrent"),
      }),
  });
}

export type ChangeEmailType = z.infer<ReturnType<typeof changeEmailSchema>>;

export function businessDetailsSchema(t: SettingsTranslator) {
  return z.object({
    businessName: z
      .string()
      .trim()
      .min(1, { error: t("fields.businessName.required") }),
    firstName: z
      .string()
      .trim()
      .min(1, { error: t("fields.firstName.required") }),
    lastName: z
      .string()
      .trim()
      .min(1, { error: t("fields.lastName.required") }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, { error: t("fields.email.required") })
      .email({ error: t("fields.email.validation") }),
    phone: z
      .string()
      .trim()
      .refine((val) => val === "" || /^(?:\+48)?(?:[\s-]?\d){9}$/.test(val), {
        error: t("fields.phone.validation"),
      }),
    streetAndNumber: z
      .string()
      .trim()
      .min(1, { error: t("fields.streetAndNumber.required") }),
    postcode: z
      .string()
      .trim()
      .min(1, { error: t("fields.postcode.required") })
      .regex(/^[0-9]{2}-[0-9]{3}$/, { error: t("fields.postcode.validation") }),
    city: z
      .string()
      .trim()
      .min(1, { error: t("fields.city.required") }),
    region: z.string().trim(),
    country: z.string().trim(),
  });
}

export type BusinessDetailsType = z.infer<ReturnType<typeof businessDetailsSchema>>;
