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
  { navKey: "inquiries", path: "/admin/inquiries" },
  { navKey: "clients", path: "/admin/clients" },
  { navKey: "events", path: "/admin/events" },
  { navKey: "contracts", path: "/admin/contracts" },
  { navKey: "playlists", path: "/admin/playlists" },
  { navKey: "settings", path: "/admin/settings/account-details" },
];

// Client panel: the event group follows the selector, the account group doesn't.
// requiresEvent – greyed out while there is no confirmed event (only an inquiry or nothing)
export const dashboardEventItems: DashboardItem[] = [
  { navKey: "home", path: "/dashboard" },
  { navKey: "event", path: "/dashboard/event/edit", requiresEvent: true },
  { navKey: "contracts", path: "/dashboard/contracts", requiresEvent: true },
  { navKey: "wedding", path: "/dashboard/wedding", requiresEvent: true, requiresWedding: true },
  { navKey: "playlists", path: "/dashboard/playlists", requiresEvent: true },
  { navKey: "notes", path: "/dashboard/notes", requiresEvent: true },
];

export const dashboardAccountItems: DashboardItem[] = [
  { navKey: "account", path: "/dashboard/account" },
];
