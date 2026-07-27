import { Cormorant_Garamond, Manrope } from "next/font/google";

export const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope" });
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
});
