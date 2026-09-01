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
  { labelKey: "wedding", value: "wedding" },
  { labelKey: "prom", value: "prom" },
  { labelKey: "anniversary", value: "anniversary" },
  { labelKey: "eighteenthBirthday", value: "eighteenthBirthday" },
  { labelKey: "conference", value: "conference" },
  { labelKey: "corporateEvent", value: "corporateEvent" },
  { labelKey: "festival", value: "festival" },
  { labelKey: "other", value: "other" },
];
