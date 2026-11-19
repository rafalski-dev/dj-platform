import { differenceInCalendarDays } from "date-fns";
import { getTranslations } from "next-intl/server";
import { OverviewCardTile } from "./overviewCard";

// Right side of the inquiry and event cards. A past event (e.g. picked in the selector) has
// no countdown – just a short note
export async function DaysLeftTile({ date }: { date: Date }) {
  const t = await getTranslations("Dashboard.Overview.daysLeft");
  const daysLeft = differenceInCalendarDays(date, new Date());

  if (daysLeft <= 0)
    return (
      <OverviewCardTile>
        <span className="text-accent-foreground font-serif text-[28px]/none">
          {daysLeft === 0 ? t("today") : t("past")}
        </span>
      </OverviewCardTile>
    );

  return (
    <OverviewCardTile>
      <span className="text-accent-foreground font-serif text-[44px]/none lining-nums">
        {daysLeft}
      </span>
      <span className="text-muted-foreground text-xs tracking-wider uppercase">
        {t("label", { count: daysLeft })}
      </span>
    </OverviewCardTile>
  );
}
