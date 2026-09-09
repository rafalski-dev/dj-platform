import { SectionPolicy } from "@/components/shared/sectionPolicy";
import { SectionTitle } from "@/components/shared/sectionTitle";
import { Wrapper } from "@/components/shared/wrapper";
import { siteConfig } from "@/config/site";
import { getTranslations } from "next-intl/server";

export default async function TermsAndConditions() {
  const t = await getTranslations("TermsAndConditions");
  return (
    <main className="py-25 md:py-35 lg:py-45">
      <Wrapper>
        <div className="m-auto flex max-w-3xl flex-col items-center gap-10">
          <SectionTitle>{t("sectionTitle")}</SectionTitle>
          <div className="border-border/15 bg-card flex flex-col gap-6 rounded-2xl border p-4 md:p-6 lg:p-7">
            <SectionPolicy
              title={t("terms.1.title")}
              content={t("terms.1.content", {
                url: siteConfig.url,
                brandName: siteConfig.name,
                address: `${siteConfig.address.city} ${siteConfig.address.zipCode}, ${siteConfig.address.street} ${siteConfig.address.doorNumber}`,
              })}
            />
            <SectionPolicy
              title={t("terms.2.title")}
              content={t("terms.2.content", {
                url: siteConfig.url,
              })}
            />
            <SectionPolicy
              title={t("terms.3.title")}
              content={t("terms.3.content", {
                url: siteConfig.url,
              })}
            />
            <SectionPolicy
              title={t("terms.4.title")}
              content={t("terms.4.content", {
                brandName: siteConfig.name,
              })}
            />
            <SectionPolicy title={t("terms.5.title")} content={t("terms.5.content")} />
            <SectionPolicy title={t("terms.6.title")} content={t("terms.6.content")} />
            <SectionPolicy title={t("terms.7.title")} content={t("terms.7.content")} />
            <SectionPolicy
              title={t("terms.8.title")}
              content={t("terms.8.content", {
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
