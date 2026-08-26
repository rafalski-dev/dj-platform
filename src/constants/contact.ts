import { siteConfig } from "@/config/site";
import { contactDataItemType } from "@/types/contact";

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
  { nameKey: "coverage", content: undefined, href: undefined },
];

export const eventTypeKeys = [
  { labelKey: "placeholder", value: null },
  { labelKey: "wedding", value: "wedding" },
  { labelKey: "prom", value: "prom" },
  { labelKey: "anniversary", value: "anniversary" },
  { labelKey: "18th birthday", value: "18th birthday" },
  { labelKey: "conference", value: "conference" },
  { labelKey: "corporateEvent", value: "corporateEvent" },
  { labelKey: "festival", value: "festival" },
  { labelKey: "other", value: "other" },
];
