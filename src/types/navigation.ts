import { routing } from "@/i18n/routing";

type AllPathnames = keyof typeof routing.pathnames;
export type Pathname = Exclude<AllPathnames, `${string}[${string}]${string}`>;

export type NavItem = {
  navKey: string;
  path: string;
};

export type ClientItem = {
  navKey: "dashboard" | "termsAndConditions" | "privacyPolicy";
  path: Pathname;
};

export type AdminItem = {
  navKey: "home" | "clients" | "events" | "contracts" | "playlists" | "personal-details";
  path: Pathname;
};
