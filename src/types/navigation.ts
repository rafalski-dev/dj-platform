import type { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";
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
  navKey: "home" | "inquiries" | "clients" | "events" | "contracts" | "playlists" | "settings";
  path: Pathname;
};

export type DashboardItem = {
  navKey: "home" | "contracts" | "playlists" | "settings";
  path: Pathname;
  requiresEvent?: boolean;
};

// TS can match `{ pathname: <union> }` against Link's href only for up to 25 routes –
// we have more, so object hrefs built from a Pathname variable are cast to this.
export type Href = ComponentProps<typeof Link>["href"];
