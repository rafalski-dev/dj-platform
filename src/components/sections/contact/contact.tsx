import { Section } from "@/components/shared/sections/section";
import { SectionDescription } from "@/components/shared/sections/sectionDescription";
import { SectionLabel } from "@/components/shared/sections/sectionLabel";
import { SectionTitle } from "@/components/shared/sections/sectionTitle";
import { Wrapper } from "@/components/shared/wrapper";
import { contactDetailsData } from "@/constants/contact";
import { getTranslations } from "next-intl/server";
import { ContactList } from "./contactList";
import { ContactForm } from "./contactForm";

export async function Contact() {
  const t = await getTranslations("LandingPage.Contact");
  return (
    <Section anchorLink={t("id")}>
      <Wrapper>
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex flex-col items-start gap-8 lg:w-1/2">
            <div className="flex flex-col items-start">
              <SectionLabel>{t("sectionLabel")}</SectionLabel>
              <SectionTitle>{t("sectionTitle")}</SectionTitle>
              <SectionDescription>{t("sectionDescription")}</SectionDescription>
            </div>
            <ContactList listData={contactDetailsData} />
          </div>
          <ContactForm className="lg:w-1/2" />
        </div>
      </Wrapper>
    </Section>
  );
}
