import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pl"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/signIn": "/signIn",
    "/dashboard": "/dashboard",
    "/terms-and-conditions": {
      en: "/terms-and-conditions",
      pl: "/regulamin",
    },
    "/privacy-policy": {
      en: "/privacy-policy",
      pl: "/polityka-prywatnosci",
    },
  },
});
