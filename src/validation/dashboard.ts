import type { useTranslations } from "next-intl";
import z from "zod";

type AccountTranslator = ReturnType<typeof useTranslations<"Dashboard.Account">>;

// Same rules as the admin business details – the address goes on the contract
export function myDetailsSchema(t: AccountTranslator) {
  return z.object({
    firstName: z
      .string()
      .trim()
      .min(1, { error: t("details.fields.firstName.required") }),
    lastName: z
      .string()
      .trim()
      .min(1, { error: t("details.fields.lastName.required") }),
    phone: z
      .string()
      .trim()
      .refine((val) => val === "" || /^(?:\+48)?(?:[\s-]?\d){9}$/.test(val), {
        error: t("details.fields.phone.validation"),
      }),
    streetAndNumber: z
      .string()
      .trim()
      .min(1, { error: t("details.fields.streetAndNumber.required") }),
    postcode: z
      .string()
      .trim()
      .min(1, { error: t("details.fields.postcode.required") })
      .regex(/^[0-9]{2}-[0-9]{3}$/, { error: t("details.fields.postcode.validation") }),
    city: z
      .string()
      .trim()
      .min(1, { error: t("details.fields.city.required") }),
    region: z.string().trim(),
    country: z.string().trim(),
  });
}

export type MyDetailsType = z.infer<ReturnType<typeof myDetailsSchema>>;
