import type { useTranslations } from "next-intl";
import z from "zod";
import { EventType, Addon, Package, WeddingKind } from "../../generated";

type CreateEventTranslator = ReturnType<typeof useTranslations<"Admin.Events.Form">>;

export function createEventSchema(t: CreateEventTranslator) {
  const type = Object.values(EventType);
  const addons = Object.values(Addon);
  const eventPackage = Object.values(Package);
  const weddingKind = Object.values(WeddingKind);

  return z
    .object({
      eventType: z
        .object({ type: z.enum(type, t("eventType.required")), altType: z.string().trim() })
        .refine((val) => !(val.type === "Other" && val.altType === ""), {
          error: t("eventType.custom.required"),
          path: ["altType"],
        }),
      basics: z.object({
        client: z.object(
          { label: z.string().trim(), value: z.string().trim() },
          t("basics.client.required"),
        ),
        guestCount: z.string().regex(/^\d+$/, t("basics.guests.required")),
        eventTitle: z.string().trim().min(1, t("basics.eventTitle.required")),
        wedding: z.object({
          bride: z.string().trim(),
          groom: z.string().trim(),
          brideWitness: z.string().trim(),
          groomWitness: z.string().trim(),
          brideMother: z.string().trim(),
          brideFather: z.string().trim(),
          groomMother: z.string().trim(),
          groomFather: z.string().trim(),
        }),
      }),
      dateAndPlace: z
        .object({
          eventDate: z.date(t("dateAndPlace.eventDate.required")),
          eventStartTime: z.string().min(1, t("dateAndPlace.startsAt.required")),
          eventEndTime: z.string().min(1, t("dateAndPlace.endsAt.required")),
          eventPlace: z.string().trim().min(1, t("dateAndPlace.eventPlace.required")),
          eventAddress: z.string().trim().min(1, t("dateAndPlace.address.required")),
          weddingKind: z.enum(weddingKind).optional(),
          ceremonyDate: z.date().optional(),
          ceremonyStartTime: z.string(),
          ceremonyPlace: z.string(),
          ceremonyAddress: z.string(),
        })
        .superRefine(
          (data, ctx) => {
            if (data.weddingKind === "None" || !data.weddingKind) return;
            if (!data.ceremonyDate) {
              ctx.addIssue({
                code: "custom",
                path: ["ceremonyDate"],
                message: t("dateAndPlace.ceremonyDate.required"),
              });
            }
            if (data.ceremonyDate && data.ceremonyDate > data.eventDate) {
              ctx.addIssue({
                code: "custom",
                path: ["ceremonyDate"],
                message: t("dateAndPlace.ceremonyDate.afterEvent"),
              });
            }

            if (data.ceremonyStartTime === "") {
              ctx.addIssue({
                code: "custom",
                path: ["ceremonyStartTime"],
                message: t("dateAndPlace.ceremonyStartsAt.required"),
              });
            }
            if (data.weddingKind === "Church" || data.weddingKind === "Civil") {
              if (!data.ceremonyPlace) {
                ctx.addIssue({
                  code: "custom",
                  path: ["ceremonyPlace"],
                  message: t("dateAndPlace.ceremonyPlace.required"),
                });
              }
              if (!data.ceremonyAddress) {
                ctx.addIssue({
                  code: "custom",
                  path: ["ceremonyAddress"],
                  message: t("dateAndPlace.ceremonyAddress.required"),
                });
              }
            }
          },
          { when: () => true },
        ),
      package: z
        .object({
          eventPackage: z.enum(eventPackage, t("package.required.package")),
          addons: z.array(z.enum(addons)),
          message: z.string().max(2000, t("package.message.max")),
        })
        .superRefine((data, ctx) => {
          if (data.eventPackage === "Signature" && data.addons.length === 0) {
            ctx.addIssue({
              code: "custom",
              path: ["addons"],
              message: t("package.required.addons"),
            });
          }
        }),
    })
    .superRefine(
      (data, ctx) => {
        if (data.eventType.type !== "Wedding") return;
        if (!data.basics.wedding.bride) {
          ctx.addIssue({
            code: "custom",
            path: ["basics", "wedding", "bride"],
            message: t("basics.wedding.required.bride"),
          });
        }
        if (!data.basics.wedding.groom) {
          ctx.addIssue({
            code: "custom",
            path: ["basics", "wedding", "groom"],
            message: t("basics.wedding.required.groom"),
          });
        }
        if (!data.basics.wedding.brideWitness) {
          ctx.addIssue({
            code: "custom",
            path: ["basics", "wedding", "brideWitness"],
            message: t("basics.wedding.required.brideWitness"),
          });
        }
        if (!data.basics.wedding.groomWitness) {
          ctx.addIssue({
            code: "custom",
            path: ["basics", "wedding", "groomWitness"],
            message: t("basics.wedding.required.groomWitness"),
          });
        }
        if (!data.dateAndPlace.weddingKind) {
          ctx.addIssue({
            code: "custom",
            path: ["dateAndPlace", "weddingKind"],
            message: t("dateAndPlace.weddingKind.required"),
          });
        }
      },
      { when: () => true },
    );
}

export type CreateEventSchema = z.infer<ReturnType<typeof createEventSchema>>;
