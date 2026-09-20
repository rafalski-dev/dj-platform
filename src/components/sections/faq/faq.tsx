import { getTranslations } from "next-intl/server";
import { Section } from "../../shared/sections/section";
import { Wrapper } from "../../shared/wrapper";
import { SectionLabel } from "../../shared/sections/sectionLabel";
import { SectionTitle } from "../../shared/sections/sectionTitle";
import { FAQAccordion } from "./faqAccordion";
import { FAQData } from "@/constants/faq";

export async function FAQ() {
  const t = await getTranslations("LandingPage.FAQ");

  return (
    <Section>
      <Wrapper>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <SectionLabel position="center">{t("sectionLabel")}</SectionLabel>
            <SectionTitle className="max-w-75 text-center lg:max-w-100">
              {t("sectionTitle")}
            </SectionTitle>
          </div>
          <FAQAccordion FAQData={FAQData} />
        </div>
      </Wrapper>
    </Section>
  );
}
