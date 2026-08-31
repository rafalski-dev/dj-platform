import { Translator } from "@/types/contact";
import z from "zod";

export function creatingContactSchema(t: Translator) {
  return z.object({
    fullName: z
      .string()
      .trim()
      .nonempty({ error: t("formInputs.fullName.required") })
      .refine((val) => val.split(" ").length >= 2, { error: t("formInputs.fullName.validation") }),
    email: z
      .string()
      .trim()
      .nonempty({ error: t("formInputs.email.required") })
      .email({ error: t("formInputs.email.validation") }),
    phone: z
      .string()
      .trim()
      .nonempty({ error: t("formInputs.phone.required") })
      .min(9, {
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
    eventType: z.enum(
      [
        "wedding",
        "prom",
        "anniversary",
        "18th birthday",
        "conference",
        "corporateEvent",
        "festival",
        "other",
      ],
      { error: t("formInputs.eventType.required") },
    ),
    place: z.union([z.string().min(3, { error: t("formInputs.place.validation") }), z.literal("")]),
    message: z
      .string()
      .min(20, { error: t("formInputs.message.validationMin") })
      .max(2000, { error: t("formInputs.message.validationMax") }),
    terms: z.literal(true, { error: t("formInputs.terms.required") }),
  });
}
