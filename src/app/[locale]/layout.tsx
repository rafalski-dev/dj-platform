import type { Metadata } from "next";
import "@/styles/globals.css";
import { cormorant, manrope } from "@/components/ui/fonts/fonts";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { Header } from "@/components/shared/header/header";

export const metadata: Metadata = {
  title: "DJ-platform",
  description: "Universal platform for dj's and bands.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale} className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
