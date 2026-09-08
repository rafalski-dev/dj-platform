export function AboutCardsList({
  itemsList,
  t,
}: {
  itemsList: string[];
  t: (key: string) => string;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
      {itemsList.map((card) => (
        <div
          key={card}
          className="border-border/12 bg-secondary flex min-h-42 flex-col justify-between gap-4 rounded-4xl border px-6 py-5 backdrop-blur-sm md:py-6"
        >
          <span className="text-accent font-serif text-[36px] md:text-[48px]">
            {t(`stats.${card}.number`)}
          </span>
          <span className="text-popover-foreground text-[14px] font-light md:text-[15px]">
            {t(`stats.${card}.label`)}
          </span>
        </div>
      ))}
    </div>
  );
}
