export const siteConfig = {
  name: "DJ Maven",
  fullName: "Marek Nowicki",
  url: "https://djmaven.com",
  ogImage: "https://dj-platform.vercel.app/og-image.jpg",
  contact: { number: "+44 500 200 100", email: "contact@djmaven.com" },
  address: {
    city: "Warszawa",
    zipCode: "01-100",
    street: "ul. Gdańska",
    doorNumber: "5",
  },
  socialMedia: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
