import { Wrapper } from "../shared/wrapper";
import { SectionLabel } from "../shared/sectionLabel";
import { SectionDescription } from "../shared/sectionDescription";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { StarIcon } from "../icons/starIcon";
import { getTranslations } from "next-intl/server";
import { CustomImage } from "../shared/customImage";
import { BgGlowOrb } from "../shared/decorations/glowOrbs";

export async function Hero() {
  const t = await getTranslations("LandingPage.Hero");

  return (
    <section className="relative pt-25 pb-16 md:pt-35 md:pb-24 lg:flex lg:min-h-245 lg:items-center lg:pb-32">
      <BgGlowOrb
        position="bottom-[-15%] left-[-5%] 3xl:left-[17%]"
        size="43"
        maxSize="850"
        baseOpacity="0.09"
        animationDuration="40"
      />
      <Wrapper>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex w-full flex-col lg:w-1/2">
            <SectionLabel>{t("sectionLabel")}</SectionLabel>
            <h1 className="mb-6 max-w-150 text-[44px]/13 md:text-[54px]/13 lg:mt-2 lg:text-[68px]/20">
              {t("titleStart")}{" "}
              <span className="from-foreground to-primary bg-linear-to-r to-50% bg-clip-text text-[44px] text-transparent md:text-[54px] lg:text-[68px]">
                {t("titleHighlighted")}
              </span>
            </h1>
            <div className="max-w-140 md:hidden">
              <SectionDescription className="mb-8 text-[18px]/8 md:text-[19px]">
                {t("sectionDescriptionNarrow")}
              </SectionDescription>
            </div>
            <div className="hidden md:block md:max-w-160">
              <SectionDescription className="mb-8 text-[18px]/8 md:text-[19px]">
                {t("sectionDescriptionWide")}
              </SectionDescription>
            </div>
            <div className="flex flex-wrap gap-3 lg:mt-2 lg:gap-5">
              <Button size="lg">
                {t("primaryButton")}
                <MoveRight />
              </Button>
              <Button variant="outline" size="lg">
                {t("secondaryButton")}
              </Button>
            </div>
            <div className="mt-6 flex items-center md:gap-2">
              <div className="mr-2 flex gap-0.75">
                {Array(5)
                  .fill(null)
                  .map((_, index) => {
                    return <StarIcon color="#ebd3a0" size={15} key={index} />;
                  })}
              </div>
              <div className="text-popover-foreground flex gap-1">
                {t("rating")} 4.8/5 <span className="hidden md:inline">{t("and")}</span>
                <span className="text-foreground/85 ml-1">380+</span>
                {t("events")}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <CustomImage
              src="/images/hero.jpg"
              alt="The crowd and the DJ dances on the dancefloor."
              priority
              ratio="aspect-3/2"
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 50vw"
              contrast="contrast-105"
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
