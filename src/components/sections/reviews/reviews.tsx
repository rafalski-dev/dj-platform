import { getTranslations } from "next-intl/server";
import { Section } from "../../shared/sections/section";
import { Wrapper } from "../../shared/wrapper";
import { SectionLabel } from "../../shared/sections/sectionLabel";
import { SectionTitle } from "../../shared/sections/sectionTitle";
import { ReviewsCarousel } from "./reviewsCarousel";
import { reviewsData } from "@/constants/reviews";

export async function Reviews() {
  const t = await getTranslations("LandingPage.Reviews");
  return (
    <Section anchorLink={t("id")}>
      <Wrapper>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <SectionLabel position="center">{t("sectionLabel")}</SectionLabel>
            <SectionTitle className="max-w-110 text-center md:max-w-120 lg:max-w-165">
              {t("sectionTitle")}
            </SectionTitle>
          </div>
          <ReviewsCarousel reviewsData={reviewsData} />
        </div>
      </Wrapper>
    </Section>
  );
}
