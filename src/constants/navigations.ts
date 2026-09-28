import { AdminItem, ClientItem, NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  { navKey: "about", path: "about" },
  { navKey: "offer", path: "offer" },
  { navKey: "reviews", path: "reviews" },
  { navKey: "contact", path: "contact" },
];

export const clientItems: ClientItem[] = [
  { navKey: "dashboard", path: "/dashboard" },
  { navKey: "termsAndConditions", path: "/terms-and-conditions" },
  { navKey: "privacyPolicy", path: "/privacy-policy" },
];

export const adminItems: AdminItem[] = [
  { navKey: "home", path: "/admin" },
  { navKey: "clients", path: "/admin/clients" },
  { navKey: "events", path: "/admin/events" },
  { navKey: "contracts", path: "/admin/contracts" },
  { navKey: "playlist", path: "/admin/playlists" },
  { navKey: "details", path: "/admin/personal-details" },
];
