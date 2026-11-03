import { formatDuration } from "@/lib/utils";
import { TZDate } from "@date-fns/tz";
import { getFormatter, getTranslations } from "next-intl/server";

// The axis shows one day and night of work: from 08:00 to 08:00 on the next day
const AXIS_START_HOUR = 8;
const AXIS_HOURS = 24;
const AXIS_LABELS = ["08:00", "14:00", "20:00", "02:00", "08:00"];

function toPercent(hours: number) {
  return `${(hours / AXIS_HOURS) * 100}%`;
}

type EventTimelineProps = { startsAt: Date; endsAt: Date };

export async function EventTimeline({ startsAt, endsAt }: EventTimelineProps) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Events.Details.dateAndPlace");

  const time = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" } as const;

  const start = new TZDate(startsAt, "Europe/Warsaw");
  const startHour = start.getHours() + start.getMinutes() / 60;
  const offset = (startHour - AXIS_START_HOUR + AXIS_HOURS) % AXIS_HOURS;
  const duration = (endsAt.getTime() - startsAt.getTime()) / 3600000;

  return (
    <div className="flex flex-col gap-3 border-t pt-5">
      <div className="flex flex-row flex-wrap items-center justify-between gap-2">
        <h3 className="text-accent-foreground font-sans text-[13px] font-semibold uppercase">
          {t("timeline")}
        </h3>
        <p className="text-muted-foreground text-[13px]">
          {format.dateTime(startsAt, time)} → {format.dateTime(endsAt, time)} ·{" "}
          {formatDuration(startsAt, endsAt)}
        </p>
      </div>
      <div aria-hidden="true" className="flex flex-col gap-2">
        <div className="bg-foreground/5 relative h-3 rounded-full">
          <div
            className="bg-gold-gradient absolute inset-y-0 min-w-1 rounded-full"
            style={{
              left: toPercent(offset),
              width: toPercent(Math.min(duration, AXIS_HOURS - offset)),
            }}
          />
          {/* midnight */}
          <div
            className="bg-border-strong absolute -inset-y-1 w-px"
            style={{ left: toPercent(AXIS_HOURS - AXIS_START_HOUR) }}
          />
        </div>
        <div className="text-popover-foreground flex flex-row justify-between text-xs">
          {AXIS_LABELS.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
