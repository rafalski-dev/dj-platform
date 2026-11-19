import type { ClientEventOption } from "@/data/dashboard";
import { getFormatter, getTranslations } from "next-intl/server";
import { DaysLeftTile } from "./daysLeftTile";
import { OverviewCard } from "./overviewCard";

type EventOption = Extract<ClientEventOption, { kind: "event" }>;

// Same colors as the admin StatusBadge, but for the client Pending = date confirmed → green
// (like the dot in the nav selector)
const statusStyles: Record<EventOption["status"], string> = {
  Pending: "text-success/80 border-success/15 bg-success/5",
  Active: "text-success/80 border-success/15 bg-success/5",
  Completed: "text-muted-foreground/80 border-muted-foreground/15 bg-muted-foreground/5",
  Cancelled: "text-destructive/80 border-destructive/20 bg-destructive/5",
  Archived: "text-muted-foreground/60 border-border bg-background",
};

// The DJ confirmed the date – the event the client picked in the nav selector
export async function EventOverviewCard({ event }: { event: EventOption }) {
  // same status texts as the selector, so both always say the same
  const tStatus = await getTranslations("Dashboard.EventSelector.status");
  const format = await getFormatter();

  return (
    <OverviewCard
      badge={tStatus(event.status)}
      badgeClassName={statusStyles[event.status]}
      // the name already says the type (e.g. "Wesele – Anna Nowak")
      label={event.name}
      title={format.dateTime(event.date, { dateStyle: "long" })}
      aside={<DaysLeftTile date={event.date} />}
    >
      <p className="text-muted-foreground -mt-2 text-[15px] font-light wrap-break-word">
        {event.place}
      </p>
    </OverviewCard>
  );
}
