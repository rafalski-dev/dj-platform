import { getTranslations } from "next-intl/server";
import { Section } from "../../shared/sections/section";
import { SectionDescription } from "../../shared/sections/sectionDescription";
import { SectionLabel } from "../../shared/sections/sectionLabel";
import { SectionTitle } from "../../shared/sections/sectionTitle";
import { Wrapper } from "../../shared/wrapper";
import { offerAddonsData, offerCardsData } from "@/constants/offer";
import { OfferCardsList } from "./offerCardsList";

export async function Offer() {
  const t = await getTranslations("LandingPage.Offer");

  return (
    <Section anchorLink={t("id")}>
      <Wrapper>
        <div className="flex flex-col items-center gap-12">
          <div className="flex w-full flex-col items-center">
            <SectionLabel position="center">{t("sectionLabel")}</SectionLabel>
            <SectionTitle className="text-center md:max-w-110 lg:max-w-140">
              {t("sectionTitle")}
            </SectionTitle>
            <SectionDescription className="text-center md:max-w-150 lg:max-w-180">
              {t("sectionDescription")}
            </SectionDescription>
          </div>
          <div className="w-full">
            <OfferCardsList cardsList={offerCardsData} />
          </div>
          <div className="flex flex-col items-center gap-4 md:max-w-160">
            <p className="text-muted-foreground text-center uppercase">{t("availableAddons")}</p>
            <ul className="flex flex-wrap justify-center">
              {offerAddonsData.map((addon) => {
                return (
                  <li
                    key={addon}
                    className="border-border/12 bg-secondary m-1.5 flex h-9 items-center rounded-full border px-4"
                  >
                    <p className="text-muted-foreground text-[14px] font-extralight">
                      {t(`addons.${addon}`)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
