import { Wrapper } from "../shared/wrapper";
import { SectionLabel } from "../shared/sectionLabel";
import { SectionDescription } from "../shared/sectionDescription";
import { buttonVariants } from "../ui/button";
import { MoveRight } from "lucide-react";
import { StarIcon } from "../icons/starIcon";
import { getTranslations } from "next-intl/server";
import { CustomImage } from "../shared/customImage";
import { BgGlowOrb } from "../decorations/glowOrbs";
import { Section } from "../shared/section";
import heroImg from "../../assets/images/hero.jpg";

export async function Hero() {
  const t = await getTranslations("LandingPage");

  return (
    <Section
      anchorLink="#"
      className="relative pt-25 pb-16 md:pt-35 md:pb-24 lg:flex lg:min-h-245 lg:items-center lg:pb-32"
    >
      <BgGlowOrb
        position="bottom-[-15%] left-[-5%] 3xl:left-[17%]"
        size="43"
        maxSize="850"
        baseOpacity="0.08"
        animationDuration="40"
      />
      <Wrapper>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex w-full flex-col lg:w-1/2">
            <SectionLabel animation="rise 1s cubic-bezier(.22,.61,.36,1) both">
              {t("Hero.sectionLabel")}
            </SectionLabel>
            <h1
              className="mb-6 max-w-150 text-[44px]/13 md:text-[54px]/13 lg:mt-2 lg:text-[68px]/20"
              style={{ animation: "rise 1s cubic-bezier(.22,.61,.36,1) 0.08s both" }}
            >
              {t("Hero.titleStart")}{" "}
              <span className="from-foreground to-primary bg-linear-to-r to-50% bg-clip-text text-[44px] text-transparent md:text-[54px] lg:text-[68px]">
                {t("Hero.titleHighlighted")}
              </span>
            </h1>
            <div style={{ animation: "rise 1s cubic-bezier(.22,.61,.36,1) 0.16s both" }}>
              <div className="max-w-140 md:hidden">
                <SectionDescription className="mb-8 text-[18px]/8 md:text-[19px]">
                  {t("Hero.sectionDescriptionNarrow")}
                </SectionDescription>
              </div>
              <div className="hidden md:block md:max-w-160">
                <SectionDescription className="mb-7 text-[18px]/8 md:text-[19px]">
                  {t("Hero.sectionDescriptionWide")}
                </SectionDescription>
              </div>
            </div>
            <div
              className="flex flex-wrap gap-3 lg:mt-2 lg:gap-5"
              style={{ animation: "rise 1s cubic-bezier(.22,.61,.36,1) 0.24s both" }}
            >
              <a
                href={t("Navigation.navPaths.contact")}
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                {t("Hero.PrimaryCTA")}
                <MoveRight />
              </a>
              <a
                href={t("Navigation.navPaths.offer")}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {t("Hero.SecondaryCTA")}
              </a>
            </div>
            <div
              className="mt-6 flex items-center md:gap-2"
              style={{ animation: "rise 1s cubic-bezier(.22,.61,.36,1) 0.32s both" }}
            >
              <div className="mr-2 flex gap-0.75">
                {Array(5)
                  .fill(null)
                  .map((_, index) => {
                    return <StarIcon color="#ebd3a0" size={15} key={index} />;
                  })}
              </div>
              <div className="text-popover-foreground flex gap-1">
                {t("Hero.rating")} 4.8/5 <span className="hidden md:inline">{t("Hero.and")}</span>
                <span className="text-foreground/85 ml-1">380+</span>
                {t("Hero.events")}
              </div>
            </div>
          </div>
          <div
            className="w-full lg:w-1/2"
            style={{ animation: "rise 1s cubic-bezier(.22,.61,.36,1) 0.2s both" }}
          >
            <CustomImage
              src={heroImg}
              alt="The crowd and the DJ dances on the dancefloor."
              priority
              ratio="aspect-3/2"
              sizes="(max-width: 1024px) 100vw, 50vw"
              contrast="contrast-105"
            />
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
