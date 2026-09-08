import { GlowOrb } from "@/components/decorations/glowOrbs";
import { Section } from "../../shared/section";
import { SectionDescription } from "../../shared/sectionDescription";
import { SectionLabel } from "../../shared/sectionLabel";
import { SectionTitle } from "../../shared/sectionTitle";
import { Wrapper } from "../../shared/wrapper";
import { NewsletterForm } from "./newsletterForm";
import { getTranslations } from "next-intl/server";

export async function Newsletter() {
  const t = await getTranslations("LandingPage.Newsletter");
  return (
    <Section className="border-t-0 pt-4 md:pt-6 lg:pt-8">
      <Wrapper>
        <div className="border-border/12 from-card to-popover relative m-auto max-w-250 overflow-hidden rounded-4xl border bg-linear-to-tr px-8 py-12 md:px-10 lg:px-12 lg:py-16">
          <GlowOrb className="-top-23 -right-13 h-100 w-100" />
          <div className="relative flex flex-col items-center gap-7">
            <div className="flex flex-col items-center">
              <SectionLabel decoration={false}>{t("sectionLabel")}</SectionLabel>
              <SectionTitle className="max-w-80 text-center md:max-w-120 lg:max-w-130">
                {t("sectionTitle")}
              </SectionTitle>
              <SectionDescription className="max-w-100 text-center text-[16px] lg:max-w-130">
                {t("sectionDescription")}
              </SectionDescription>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
