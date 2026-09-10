import "@/styles/globals.css";
import { cormorant, manrope } from "@/components/fonts/fonts";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/themeProvider";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { Background } from "@/components/decorations/background";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("Metadata");
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title", { name: siteConfig.name }),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description", { name: siteConfig.name }),
    keywords: t("keywords").split(","),
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    openGraph: {
      type: "website",
      locale: locale === "pl" ? "pl_PL" : "en_US",
      alternateLocale: locale === "pl" ? "en_US" : "pl_PL",
      url: locale === "pl" ? `${siteConfig.url}/pl` : siteConfig.url,
      siteName: siteConfig.name,
      title: t("title", { name: siteConfig.name }),
      description: t("description", { name: siteConfig.name }),
      images: [
        {
          url: "/og-image.jpg", // 1200x630
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title", { name: siteConfig.name }),
      description: t("description", { name: siteConfig.name }),
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Background />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
