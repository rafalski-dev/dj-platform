import { routing } from "@/i18n/routing";

type Pathname = keyof typeof routing.pathnames;

export type NavItem = {
  navKey: "about" | "offer" | "reviews" | "contact";
  path: string;
};

export type ClientItem = {
  navKey: "dashboard" | "termsAndConditions" | "privacyPolicy";
  path: Pathname;
};

export type AdminItem = {
  navKey: "home" | "clients" | "events" | "contracts" | "playlist" | "details";
  path: Pathname;
};
