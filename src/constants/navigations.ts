import { ClientItem, NavItem } from "@/types/navigation";

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
