import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pl"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/login": {
      en: "/login",
      pl: "/zaloguj-sie",
    },
    "/register": {
      en: "/register",
      pl: "/rejestracja",
    },
    "/verify-email": {
      en: "/verify-email",
      pl: "/weryfikacja-email",
    },
    "/reset-password": {
      en: "/reset-password",
      pl: "/przywracanie-hasla",
    },
    "/new-password": {
      en: "/new-password",
      pl: "/nowe-haslo",
    },
    "/url-expired": {
      en: "/url-expired",
      pl: "/url-wygasl",
    },
    "/welcome": {
      en: "/welcome",
      pl: "/powitanie",
    },
    "/dashboard": {
      pl: "/panel-klienta",
      en: "/dashboard",
    },
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
