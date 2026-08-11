import { Wrapper } from "../shared/wrapper";
import { SectionLabel } from "../shared/sectionLabel";
import { SectionDescription } from "../shared/sectionDescription";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { StarIcon } from "../icons/starIcon";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("LandingPage.Hero");

  return (
    <section className="pt-25 pb-16 md:pt-35 md:pb-24 lg:pb-32">
      <Wrapper>
        <div className="grid grid-cols-1 gap-10">
          <div className="flex flex-col">
            <SectionLabel>{t("sectionLabel")}</SectionLabel>
            <h1 className="mb-6 max-w-150 text-[44px]/13 md:text-[54px]/13">
              {t("titleStart")}{" "}
              <span className="from-foreground to-primary bg-linear-to-r to-50% bg-clip-text text-[44px]/13 text-transparent md:text-[54px]/13">
                {t("titleHighlighted")}
              </span>
            </h1>
            <div className="max-w-140 md:hidden">
              <SectionDescription className="mb-8">
                {t("sectionDescriptionNarrow")}
              </SectionDescription>
            </div>
            <div className="hidden md:block md:max-w-160">
              <SectionDescription className="mb-8">
                {t("sectionDescriptionWide")}
              </SectionDescription>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">
                {t("primaryButton")}
                <MoveRight />
              </Button>
              <Button variant="outline" size="lg">
                {t("secondaryButton")}
              </Button>
            </div>
            <div className="mt-6 flex items-center">
              <div className="mr-2 flex gap-0.75">
                {Array(5)
                  .fill(null)
                  .map((_, index) => {
                    return <StarIcon color="#ebd3a0" size={15} key={index} />;
                  })}
              </div>
              <div className="text-muted-foreground flex gap-1">
                {t("rating")} 5/5 <span className="hidden md:inline">{t("and")}</span>
                <span className="text-foreground/85 ml-1">380+</span>
                {t("events")}
              </div>
            </div>
          </div>
          <div className="border-border/20 shadow-accent/10 relative aspect-3/2 overflow-hidden rounded-4xl border shadow-lg hue-rotate-15">
            <Image
              src="/images/hero.jpg"
              fill
              className="object-cover contrast-110"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw"
              alt="The crowd and the DJ dances on the dancefloor."
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
