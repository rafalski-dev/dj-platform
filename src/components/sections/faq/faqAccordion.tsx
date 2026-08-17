import { getTranslations } from "next-intl/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";

export async function FAQAccordion({ FAQData }: { FAQData: string[] }) {
  const t = await getTranslations("LandingPage.FAQ");

  return (
    <Accordion className="border-border/15 border-t border-b md:max-w-150 lg:max-w-225">
      {FAQData.map((questionKey) => {
        return (
          <AccordionItem key={questionKey} className="border-border/15 px-1">
            <AccordionTrigger className="cursor-pointer py-5 text-[22px] lg:text-2xl">
              {t(`items.${questionKey}.question`)}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-[16px]/6 font-light">
              {t(`items.${questionKey}.answer`)}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
