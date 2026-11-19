import z from "zod";
import type { useTranslations } from "next-intl";
import { EventType } from "../../generated";
import { dateFormatter } from "@/lib/utils";

export function createNewsletterSchema(emptyEmail: string, invalidEmail: string) {
  return z.object({
    email: z.string().nonempty({ error: emptyEmail }).email({ error: invalidEmail }),
  });
}

type Translator = ReturnType<typeof useTranslations>;

export function createContactSchema(t: Translator) {
  return z.object({
    firstName: z
      .string()
      .trim()
      .min(1, { error: t("formInputs.firstName.required") }),
    lastName: z
      .string()
      .trim()
      .min(1, { error: t("formInputs.lastName.required") }),
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
    eventDate: createEventDateSchema(t),
    eventType: z.enum(EventType, { error: t("formInputs.eventType.required") }),
    place: z
      .string()
      .trim()
      .min(1, { error: t("formInputs.place.required") })
      .min(3, { error: t("formInputs.place.validation") }),
    // separate from the name, so it lands in its own column (Event.address on accept)
    address: z
      .string()
      .trim()
      .min(1, { error: t("formInputs.address.required") })
      .min(5, { error: t("formInputs.address.validation") }),
    message: z
      .string()
      .trim()
      .max(2000, { error: t("formInputs.message.validationMax") }),
    terms: z.boolean().refine((val) => val === true, { error: t("formInputs.terms.required") }),
    // honeypot – hidden from people, bots fill it in
    website: z.string(),
  });
}

// Shared by step 1 (date check) and the full form
export function createEventDateSchema(t: Translator) {
  return (
    z
      .date({ error: t("formInputs.eventDate.required") })
      // compare Warsaw days, so "today" passes on a UTC server too
      .refine((val) => dateFormatter(val).eventDate >= dateFormatter(new Date()).eventDate, {
        error: t("formInputs.eventDate.past"),
      })
  );
}

export type ContactSchema = z.infer<ReturnType<typeof createContactSchema>>;
