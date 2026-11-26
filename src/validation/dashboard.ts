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

type EventDetailsTranslator = ReturnType<typeof useTranslations<"Dashboard.EventEdit">>;

// Time and place the contract needs – the dates and the venue name stay with the DJ.
// ceremony – only for a wedding with a ceremony (the action checks that it's there);
// its place is the client's to change any time
export function eventDetailsSchema(t: EventDetailsTranslator) {
  return z.object({
    startTime: z.string().min(1, { error: t("fields.startTime.required") }),
    endTime: z.string().min(1, { error: t("fields.endTime.required") }),
    address: z
      .string()
      .trim()
      .min(1, { error: t("fields.address.required") }),
    ceremony: z
      .object({
        startTime: z.string().min(1, { error: t("fields.ceremonyStartTime.required") }),
        place: z
          .string()
          .trim()
          .min(1, { error: t("fields.ceremonyPlace.required") }),
        address: z
          .string()
          .trim()
          .min(1, { error: t("fields.ceremonyAddress.required") }),
      })
      .optional(),
  });
}

export type EventDetailsType = z.infer<ReturnType<typeof eventDetailsSchema>>;

type WeddingDetailsTranslator = ReturnType<typeof useTranslations<"Dashboard.WeddingEdit">>;

// Only the couple is required – witnesses are often chosen later, parents may not apply
export function weddingDetailsSchema(t: WeddingDetailsTranslator) {
  return z.object({
    bride: z
      .string()
      .trim()
      .min(1, { error: t("fields.bride.required") })
      .max(100, { error: t("fields.tooLong") }),
    groom: z
      .string()
      .trim()
      .min(1, { error: t("fields.groom.required") })
      .max(100, { error: t("fields.tooLong") }),
    brideWitness: z
      .string()
      .trim()
      .max(100, { error: t("fields.tooLong") }),
    groomWitness: z
      .string()
      .trim()
      .max(100, { error: t("fields.tooLong") }),
    brideMother: z
      .string()
      .trim()
      .max(100, { error: t("fields.tooLong") }),
    brideFather: z
      .string()
      .trim()
      .max(100, { error: t("fields.tooLong") }),
    groomMother: z
      .string()
      .trim()
      .max(100, { error: t("fields.tooLong") }),
    groomFather: z
      .string()
      .trim()
      .max(100, { error: t("fields.tooLong") }),
  });
}

export type WeddingDetailsType = z.infer<ReturnType<typeof weddingDetailsSchema>>;
