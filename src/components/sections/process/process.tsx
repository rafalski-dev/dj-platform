import { getTranslations } from "next-intl/server";
import { Section } from "../../shared/sections/section";
import { SectionLabel } from "../../shared/sections/sectionLabel";
import { Wrapper } from "../../shared/wrapper";
import { SectionTitle } from "../../shared/sections/sectionTitle";
import { SectionDescription } from "../../shared/sections/sectionDescription";
import { processStepsData } from "@/constants/process";
import { ProcessStepsList } from "./processStepsList";

export async function Process() {
  const t = await getTranslations("LandingPage.Process");

  return (
    <Section>
      <Wrapper>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div>
              <SectionLabel>{t("sectionLabel")}</SectionLabel>
              <SectionTitle className="max-w-65 md:max-w-90 lg:max-w-95">
                {t("sectionTitle")}
              </SectionTitle>
            </div>
            <SectionDescription className="max-w-80 md:mb-6 md:max-w-90 md:self-end">
              {t("sectionDescription")}
            </SectionDescription>
          </div>
          <div>
            <ProcessStepsList processStepsData={processStepsData} />
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
