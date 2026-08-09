import { NavItem } from "./navigation";
import { SocialItem } from "./socialMedia";

export type FooterSectionProps = {
  title: string;
  linksList: NavItem[];
};

export type FooterSocialSectionProps = {
  title: string;
  linksList: SocialItem[];
};

export type FooterLinkProps = NavItem;
