import type { useTranslations } from "next-intl";
import z from "zod";

type CreateClientTranslator = ReturnType<typeof useTranslations<"Admin.Clients.Create">>;

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
      .min(1, { error: t("fields.email.required") })
      .email({ error: t("fields.email.validation") }),
    phone: z.union([
      z.literal(""),
      z
        .string()
        .trim()
        .regex(/^(?:\+48)?(?:[\s-]?\d){9}$/, { error: t("fields.phone.validation") }),
    ]),
  });

  const address = z.object({
    streetAndNumber: z.string().trim(),
    postcode: z.union([
      z.literal(""),
      z
        .string()
        .trim()
        .regex(/^[0-9]{2}-[0-9]{3}$/, { error: t("fields.postcode.validation") }),
    ]),
    city: z.string().trim(),
    region: z.string().trim(),
    country: z.string().trim(),
  });

  return z.discriminatedUnion("clientType", [
    z.object({
      clientType: z.literal("Individual"),
      personalDetails: z.object({
        ...personalDetails,
        idCardNumber: z.union([
          z.literal(""),
          z
            .string()
            .trim()
            .toUpperCase()
            .regex(/^[A-Z]{3} [0-9]{6}$/, { error: t("fields.idCardNumber.validation") }),
        ]),
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
