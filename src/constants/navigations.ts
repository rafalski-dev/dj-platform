import { AdminItem, ClientItem, DashboardItem, NavItem } from "@/types/navigation";

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
  { navKey: "playlists", path: "/admin/playlists" },
  { navKey: "settings", path: "/admin/settings/account-details" },
];

export const dashboardItems: DashboardItem[] = [
  { navKey: "home", path: "/dashboard" },
  { navKey: "events", path: "/dashboard/events" },
  { navKey: "contracts", path: "/dashboard/contracts" },
  { navKey: "playlists", path: "/dashboard/playlists" },
  { navKey: "settings", path: "/dashboard/settings" },
];
