import { cn } from "@/lib/utils";
import { getFormatter } from "next-intl/server";

type EventDateTile = {
  date: Date;
  className?: string;
};

export async function EventDateTile({ date, className }: EventDateTile) {
  const format = await getFormatter();

  return (
    <time
      dateTime={date.toISOString().slice(0, 10)}
      className={cn(
        "border-border-strong bg-foreground/5 flex h-24 w-20 shrink-0 flex-col items-center justify-center gap-px rounded-xl border",
        className,
      )}
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
