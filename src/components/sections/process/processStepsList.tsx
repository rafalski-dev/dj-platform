import { getTranslations } from "next-intl/server";

export async function ProcessStepsList({ processStepsData }: { processStepsData: string[] }) {
  const t = await getTranslations("LandingPage.Process");
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4">
      {processStepsData.map((step, index) => {
        return (
          <li key={step}>
            <article>
              <header className="border-border/12 mb-4 border-b pb-3">
                <span className="text-accent/50 font-serif text-[46px]">{`0${index + 1}`}</span>
              </header>
              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-lg">{t(`steps.${step}.title`)}</h3>
                <p className="text-muted-foreground font-extralight">
                  {t(`steps.${step}.description`)}
                </p>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
