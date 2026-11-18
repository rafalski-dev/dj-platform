import { siteConfig } from "@/config/site";
import { contactDataItemType } from "@/types/contact";
import type { EventType } from "../../generated";

export const contactDetailsData: contactDataItemType[] = [
  {
    nameKey: "email",
    content: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    nameKey: "phone",
    content: siteConfig.contact.number,
    href: `tel:${siteConfig.contact.number}`,
  },
];

// value = Prisma EventType, so an accepted inquiry maps straight onto an Event
export const eventTypeKeys = [
  { labelKey: "wedding", value: "Wedding" },
  { labelKey: "prom", value: "Prom" },
  { labelKey: "anniversary", value: "Anniversary" },
  { labelKey: "eighteenthBirthday", value: "Birthday_18" },
  { labelKey: "conference", value: "Conference" },
  { labelKey: "corporateEvent", value: "Corporate_Event" },
  { labelKey: "festival", value: "Festival" },
  { labelKey: "other", value: "Other" },
] as const satisfies { labelKey: string; value: EventType }[];
