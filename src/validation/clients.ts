import type { useTranslations } from "next-intl";
import z from "zod";

type CreateClientTranslator = ReturnType<typeof useTranslations<"Admin.Clients.Form">>;

export function createClientSchema(t: CreateClientTranslator) {
  const personalDetails = {
    firstName: z
      .string()
      .trim()
      .min(1, { error: t("fields.firstName.required") }),
    lastName: z
      .string()
      .trim()
      .min(1, { error: t("fields.lastName.required") }),
  };

  const contactDetails = z.object({
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
      })
      .transform((val) => val.replace(/\D/g, "").slice(-9)),
  });

  const address = z.object({
    streetAndNumber: z.string().trim(),
    postcode: z
      .string()
      .trim()
      .refine((val) => val === "" || /^[0-9]{2}-[0-9]{3}$/.test(val), {
        error: t("fields.postcode.validation"),
      }),
    city: z.string().trim(),
    region: z.string().trim(),
    country: z.string().trim(),
  });

  return z.discriminatedUnion("clientType", [
    z.object({
      clientType: z.literal("Individual"),
      personalDetails: z.object({
        ...personalDetails,
        idCardNumber: z
          .string()
          .trim()
          .toUpperCase()
          .refine(
            (val) =>
              val === "" || /^[A-Z]{3}[0-9]{6}$/.test(val) || /^[A-Z]{3} [0-9]{6}$/.test(val),
            {
              error: t("fields.idCardNumber.validation"),
            },
          )
          .transform((val) => {
            if (val === "") return val;
            const start = val.replace(" ", "").slice(0, 3);
            const end = val.replace(" ", "").slice(3);
            return `${start} ${end}`;
          }),

        gender: z.enum(["Male", "Female", "Other"], { error: t("fields.gender.required") }),
      }),
      contactDetails: contactDetails,
      addressDetails: address,
    }),
    z.object({
      clientType: z.literal("Business"),
      personalDetails: z.object({ ...personalDetails }),
      businessDetails: z.object({
        businessName: z
          .string()
          .trim()
          .min(1, { error: t("fields.businessName.required") }),
        taxId: z
          .string()
          .trim()
          .min(1, { error: t("fields.taxId.required") })
          .regex(/^(?:PL)?(?:[\s-]?\d){10}$/i, { error: t("fields.taxId.validation") })
          .transform((value) => value.replace(/\D/g, "")),
      }),
      contactDetails: contactDetails,
      addressDetails: address,
    }),
  ]);
}

export type CreateClientType = z.infer<ReturnType<typeof createClientSchema>>;
