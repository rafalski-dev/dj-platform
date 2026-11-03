import { getFormatter } from "next-intl/server";

export async function EventDateTile({ date }: { date: Date }) {
  const format = await getFormatter();

  return (
    <time
      dateTime={date.toISOString().slice(0, 10)}
      className="border-border-strong bg-foreground/5 flex h-24 w-20 shrink-0 flex-col items-center justify-center gap-px rounded-xl border"
    >
      <span className="text-muted-foreground font-sans text-xs leading-none">
        {format.dateTime(date, { weekday: "long" })}
      </span>
      <span className="text-accent-foreground mt-1 font-serif text-[32px]/9 tracking-wider uppercase lining-nums">
        {format.dateTime(date, { day: "2-digit" })}
      </span>

      <span className="text-muted-foreground text-[11px] leading-none tracking-wider">
        {format.dateTime(date, { year: "numeric", month: "short" })}
      </span>
    </time>
  );
}
