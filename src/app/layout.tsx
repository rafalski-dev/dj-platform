import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { cormorant, manrope } from "@/components/ui/fonts/fonts";

export const metadata: Metadata = {
  title: "DJ-platform",
  description: "Universal platform for dj's and bands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
