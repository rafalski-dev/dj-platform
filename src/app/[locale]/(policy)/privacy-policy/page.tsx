import { SectionPolicy } from "@/components/shared/sectionPolicy";
import { SectionTitle } from "@/components/shared/sectionTitle";
import { Wrapper } from "@/components/shared/wrapper";
import { siteConfig } from "@/config/site";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.privacy" });

  return {
    title: t("title"),
    description: t("description", { name: siteConfig.name }),
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPolicy() {
  const t = await getTranslations("PrivacyPolicy");
  return (
    <main className="py-25 md:py-35 lg:py-45">
      <Wrapper>
        <div className="m-auto flex max-w-3xl flex-col items-center gap-10">
          <SectionTitle>{t("sectionTitle")}</SectionTitle>
          <div className="border-border/15 bg-card flex flex-col gap-6 rounded-2xl border p-4 md:p-6 lg:p-7">
            <SectionPolicy
              title={t("policy.1.title")}
              content={t("policy.1.content", {
                email: siteConfig.contact.email,
                brandName: siteConfig.fullName,
                address: `${siteConfig.address.city} ${siteConfig.address.zipCode}, ${siteConfig.address.street} ${siteConfig.address.doorNumber}`,
              })}
            />
            <SectionPolicy
              title={t("policy.2.title")}
              content={t("policy.2.content", {
                url: siteConfig.url,
              })}
            />
            <SectionPolicy
              title={t("policy.3.title")}
              content={t("policy.3.content", {
                url: siteConfig.url,
              })}
            />
            <SectionPolicy
              title={t("policy.4.title")}
              content={t("policy.4.content", {
                brandName: siteConfig.name,
              })}
            />
            <SectionPolicy title={t("policy.5.title")} content={t("policy.5.content")} />
            <SectionPolicy
              title={t("policy.6.title")}
              content={t("policy.6.content")}
              footer={t("policy.6.footer", { email: siteConfig.contact.email })}
            />
            <SectionPolicy title={t("policy.7.title")} content={t("policy.7.content")} />
            <SectionPolicy
              title={t("policy.8.title")}
              content={t("policy.8.content", {
                email: siteConfig.contact.email,
              })}
              boxStyles="border-0 pb-0"
            />
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
