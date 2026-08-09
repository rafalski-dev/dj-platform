import { ClientItem, NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  { navKey: "aboutMe", path: "#about-me" },
  { navKey: "services", path: "#services" },
  { navKey: "reviews", path: "#reviews" },
  { navKey: "contact", path: "#contact" },
];

export const clientItems: ClientItem[] = [
  { navKey: "dashboard", path: "/dashboard" },
  { navKey: "termsAndConditions", path: "/terms-and-conditions" },
  { navKey: "privacyPolicy", path: "/privacy-policy" },
];
