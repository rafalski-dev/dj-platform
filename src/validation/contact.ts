import z from "zod";
import type { useTranslations } from "next-intl";
type Translator = ReturnType<typeof useTranslations>;

export function createContactSchema(t: Translator) {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(1, { error: t("formInputs.fullName.required") })
      .refine((val) => val.split(" ").length >= 2, { error: t("formInputs.fullName.validation") }),
    email: z
      .string()
      .trim()
      .min(1, { error: t("formInputs.email.required") })
      .email({ error: t("formInputs.email.validation") }),
    phone: z
      .string()
      .trim()
      .min(1, { error: t("formInputs.phone.required") })
      .refine((val) => /^[+\d][\d\s-]{8,}$/.test(val), {
        error: t("formInputs.phone.validation"),
      }),
    eventDate: z.union([
      z
        .string()
        .trim()
        .regex(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, {
          error: t("formInputs.eventDate.validation"),
        }),
      z.literal(""),
    ]),
    eventType: z.string().min(1, { error: t("formInputs.eventType.required") }),
    place: z.union([
      z
        .string()
        .trim()
        .min(3, { error: t("formInputs.place.validation") }),
      z.literal(""),
    ]),
    message: z
      .string()
      .trim()
      .min(20, { error: t("formInputs.message.validationMin") })
      .max(2000, { error: t("formInputs.message.validationMax") }),
    terms: z.boolean().refine((val) => val === true, { error: t("formInputs.terms.required") }),
  });
}

export type ContactSchema = z.infer<ReturnType<typeof createContactSchema>>;
