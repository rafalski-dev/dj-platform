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
    "/admin": {
      pl: "/administrator",
      en: "/admin",
    },
    "/admin/clients": {
      pl: "/administrator/klienci",
      en: "/admin/clients",
    },
    "/admin/clients/create": {
      pl: "/administrator/klienci/dodaj",
      en: "/admin/clients/create",
    },
    "/admin/clients/[clientId]": {
      pl: "/administrator/klienci/[clientId]",
      en: "/admin/clients/[clientId]",
    },
    "/admin/clients/[clientId]/edit": {
      pl: "/administrator/klienci/[clientId]/edytuj",
      en: "/admin/clients/[clientId]/edit",
    },
    "/admin/events": {
      pl: "/administrator/wydarzenia",
      en: "/admin/events",
    },
    "/admin/events/create": {
      pl: "/administrator/wydarzenia/dodaj",
      en: "/admin/events/create",
    },
    "/admin/events/[eventId]": {
      pl: "/administrator/wydarzenia/[eventId]",
      en: "/admin/events/[eventId]",
    },
    "/admin/contracts": {
      pl: "/administrator/umowy",
      en: "/admin/contracts",
    },
    "/admin/contracts/create": {
      pl: "/administrator/umowy/dodaj",
      en: "/admin/contracts/create",
    },
    "/admin/contracts/[contractId]": {
      pl: "/administrator/umowy/[contractId]",
      en: "/admin/contracts/[contractId]",
    },
    "/admin/playlists": {
      pl: "/administrator/listy-utworow",
      en: "/admin/playlists",
    },
    "/admin/playlists/create": {
      pl: "/administrator/listy-utworow/dodaj",
      en: "/admin/playlists/create",
    },
    "/admin/playlists/[playlistId]": {
      pl: "/administrator/listy-utworow/[playlistId]",
      en: "/admin/playlists/[playlistId]",
    },
    "/admin/personal-details": {
      pl: "/administrator/moje-dane",
      en: "/admin/personal-details",
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
