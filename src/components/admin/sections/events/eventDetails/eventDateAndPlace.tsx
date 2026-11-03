import { CardHeader, Card, CardContent } from "@/components/ui/shadcn/card";
import { buttonVariants } from "@/components/ui/shadcn/button";
import type { EventDetails } from "@/data/events";
import { cn, formatDuration } from "@/lib/utils";
import { MapPinIcon, MinusIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { EventTimeline } from "./eventTimeline";

export async function EventDateAndPlace({ fetchedData }: { fetchedData: EventDetails }) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Events");
  const { date, startsAt, endsAt, place, address, guestCount } = fetchedData;

  const time = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" } as const;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place}, ${address}`)}`;

  const details = [
    {
      label: t("Details.dateAndPlace.date"),
      value: format.dateTime(date, {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
    {
      label: t("card.hours"),
      value: `${format.dateTime(startsAt, time)} – ${format.dateTime(endsAt, time)}`,
      hint: formatDuration(startsAt, endsAt),
    },
    { label: t("card.place"), value: place },
    { label: t("Details.dateAndPlace.address"), value: address },
    { label: t("card.guests"), value: guestCount },
  ];

  return (
    <Card size="md">
      <CardHeader className="flex items-center justify-between gap-3">
        <h2 className="text-[24px]">{t("Details.dateAndPlace.title")}</h2>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "xs" }),
            "text-accent-foreground",
          )}
        >
          <MapPinIcon />
          {t("Details.dateAndPlace.openMap")}
        </a>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
          {details.map(({ label, value, hint }, index) => {
            return (
              <div key={index} className="flex min-w-0 flex-col items-start gap-1">
                <dt className="text-popover-foreground text-[11.5px] tracking-wider uppercase">
                  {label}
                </dt>
                <dd className="text-foreground/85 text-[15px] wrap-break-word">
                  {value ?? (
                    <>
                      <span className="sr-only">{t("card.notSet")}</span>
                      <MinusIcon size={16} strokeWidth={1.6} className="text-popover-foreground" />
                    </>
                  )}
                  {hint && <p className="text-popover-foreground mt-0.5 text-[13px]">{hint}</p>}
                </dd>
              </div>
            );
          })}
        </dl>
        <EventTimeline startsAt={startsAt} endsAt={endsAt} />
      </CardContent>
    </Card>
  );
}
