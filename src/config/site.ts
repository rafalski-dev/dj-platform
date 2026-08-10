export const siteConfig = {
  name: "DJ Maven",
  url: "https://dj-platform.vercel.app",
  ogImage: "https://dj-platform.vercel.app/og-image.jpg",
  contact: { number: "+44 500 200 100", email: "contact@djplatform.com" },
  socialMedia: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
