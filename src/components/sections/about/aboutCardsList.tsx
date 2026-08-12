import { getTranslations } from "next-intl/server";

export async function AboutCardsList({ itemsList }: { itemsList: string[] }) {
  const t = await getTranslations("LandingPage.About");
  return (
    <div className="grid grid-cols-2 gap-3.5 md:gap-4.5 lg:grid-cols-4">
      {itemsList.map((card) => (
        <div
          key={card}
          className="border-border/20 bg-secondary flex min-h-42 flex-col justify-between gap-4 rounded-4xl border p-7 backdrop-blur-sm"
        >
          <span className="text-accent-foreground font-serif text-[36px] md:text-[48px]">
            {t(`stats.${card}.number`)}
          </span>
          <span className="text-muted-foreground/90 text-[14px] font-light md:text-[15px]">
            {t(`stats.${card}.label`)}
          </span>
        </div>
      ))}
    </div>
  );
}
