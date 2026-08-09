import { SocialItem } from "@/types/socialMedia";
import { siteConfig } from "@/config/site";

export const socialMedia: SocialItem[] = [
  { name: "Instagram", url: siteConfig.socialMedia.instagram, icon: "instagram" },
  { name: "Facebook", url: siteConfig.socialMedia.facebook, icon: "facebook" },
  { name: "YouTube", url: siteConfig.socialMedia.youtube, icon: "youtube" },
];
