import { getTranslations } from "next-intl/server";
import { Section } from "../../shared/section";
import { Wrapper } from "../../shared/wrapper";
import { SectionLabel } from "../../shared/sectionLabel";
import { SectionTitle } from "../../shared/sectionTitle";
import { TestimonialsCarousel } from "./testimonialsCarousel";
import { TestimonialDataType } from "@/types/testimonials";

const testimonialsData: TestimonialDataType[] = [
  {
    id: 1,
    femaleFullName: "Emily Carter",
    maleFullName: "Jack Carter",
    venue: "Rosewood Manor",
    date: "2025-08-05",
    rate: 5,
  },
  {
    id: 2,
    femaleFullName: "Laura Mitchell",
    maleFullName: "James Mitchell",
    venue: "The Grand Orangery",
    date: "2025-07-20",
    rate: 5,
  },
  {
    id: 3,
    femaleFullName: "Sophie Turner",
    maleFullName: "Adam Turner",
    venue: "Lakeside Pavilion",
    date: "2024-07-16",
    rate: 5,
  },
  {
    id: 4,
    femaleFullName: "Chloe Brooks",
    maleFullName: "Daniel Brooks",
    venue: "Ashford Barn",
    date: "2025-06-10",
    rate: 4,
  },
  {
    id: 5,
    femaleFullName: "Olivia Bennett",
    maleFullName: "Thomas Bennett",
    venue: "Willow Creek Estate",
    date: "2023-06-07",
    rate: 5,
  },
  {
    id: 6,
    femaleFullName: "Emma Reed",
    maleFullName: "Michael Reed",
    venue: "The Ivy House",
    date: "2025-05-06",
    rate: 5,
  },
  {
    id: 7,
    femaleFullName: "Grace Hughes",
    maleFullName: "Oliver Hughes",
    venue: "Hollow Oak Farm",
    date: "2025-05-12",
    rate: 4,
  },
  {
    id: 8,
    femaleFullName: "Ava Wallace",
    maleFullName: "Christopher Wallace",
    venue: "Bellevue Gardens",
    date: "2025-04-22",
    rate: 5,
  },
  {
    id: 9,
    femaleFullName: "Hannah Foster",
    maleFullName: "Ethan Foster",
    venue: "Maple Court",
    date: "2025-04-09",
    rate: 5,
  },
  {
    id: 10,
    femaleFullName: "Isla Coleman",
    maleFullName: "Ryan Coleman",
    venue: "The Old Mill",
    date: "2025-09-22",
    rate: 4,
  },
];

export async function Testimonials() {
  const t = await getTranslations("LandingPage.Testimonials");
  return (
    <Section>
      <Wrapper>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <SectionLabel position="center">{t("sectionLabel")}</SectionLabel>
            <SectionTitle className="max-w-110 text-center md:max-w-120 lg:max-w-165">
              {t("sectionTitle")}
            </SectionTitle>
          </div>
          <div>
            <TestimonialsCarousel testimonialsData={testimonialsData} />
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
