import { siteConfig } from "@/config/site";
import { Section } from "../../shared/section";
import { SectionDescription } from "../../shared/sectionDescription";
import { SectionLabel } from "../../shared/sectionLabel";
import { SectionTitle } from "../../shared/sectionTitle";
import { Wrapper } from "../../shared/wrapper";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AboutCardsList } from "./aboutCardsList";

const aboutCardsData: string[] = ["experience", "events", "feedback", "reliability"];

export async function About() {
  const t = await getTranslations("LandingPage.About");
  return (
    <Section>
      <Wrapper>
        <div className="flex flex-col gap-12 lg:gap-18">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="w-full lg:w-1/2">
              <div className="border-border/20 shadow-accent/10 relative aspect-3/2 overflow-hidden rounded-4xl border shadow-lg hue-rotate-8">
                <Image
                  src="/images/about.jpg"
                  fill
                  loading="eager"
                  className="object-cover contrast-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt="DJ speaking into a microphone during the event"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <SectionLabel>{t("sectionLabel")}</SectionLabel>
              <SectionTitle className="max-w-120 md:max-w-150">{t("sectionTitle")}</SectionTitle>
              <div className="mb-7 flex flex-col gap-5">
                <SectionDescription className="md:max-w-150 lg:max-w-full">
                  {t("sectionDescriptionFirst")}
                </SectionDescription>
                <SectionDescription className="md:max-w-150 lg:max-w-full">
                  {t("sectionDescriptionSecond")}
                </SectionDescription>
              </div>
              <SectionLabel textStyle="font-serif text-[24px] tracking-[2px] capitalize italic font-thin md:text-[24px] lg:text-[24px]">
                {siteConfig.fullName}
              </SectionLabel>
            </div>
          </div>
          <AboutCardsList itemsList={aboutCardsData} />
        </div>
      </Wrapper>
    </Section>
  );
}
