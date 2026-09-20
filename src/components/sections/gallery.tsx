import { Section } from "@/components/shared/sections/section";
import { SectionLabel } from "@/components/shared/sections/sectionLabel";
import { Wrapper } from "@/components/shared/wrapper";
import { CustomImage } from "../shared/customImage";
import { getTranslations } from "next-intl/server";
import { galleryData } from "@/constants/gallery";

export async function Gallery() {
  const t = await getTranslations("LandingPage.Gallery");

  return (
    <Section>
      <Wrapper>
        <div className="flex flex-col gap-5">
          <SectionLabel>{t("sectionLabel")}</SectionLabel>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
            {galleryData.map(({ id, imgSrc, altKey, ratio, contrast, hue, width, sizes }) => {
              return (
                <CustomImage
                  key={id}
                  src={imgSrc}
                  alt={t(`images.${altKey}`)}
                  ratio={ratio}
                  sizes={sizes}
                  contrast={contrast}
                  hue={hue}
                  width={width}
                />
              );
            })}
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
