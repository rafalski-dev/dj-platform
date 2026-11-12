import { EventDateTile } from "@/components/admin/shared/eventDateTile";
import { StatusBadge } from "@/components/admin/shared/statusBadge";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card";
import type { PlaylistDetails } from "@/data/playlists";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

export async function PlaylistHeader({ fetchedData }: { fetchedData: PlaylistDetails }) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Playlists");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const { createdAt, updatedAt, songs, event } = fetchedData;

  const eventType =
    event.type === "Other" && event.altType ? event.altType : tEventTypes(event.type);

  const playlistInfo = [
    { icon: <CalendarIcon size={15} />, label: t("Details.header.created"), content: createdAt },
    { icon: <ClockIcon size={15} />, label: t("Details.header.lastEdited"), content: updatedAt },
  ];

  return (
    <Card size="md" className="md:flex-row md:justify-between">
      <div className="flex min-w-0 flex-col gap-5 md:justify-between">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-2">
            <HeaderLabel label={eventType} date={event.date} />
            <h1 className="font-serif text-[30px]/none wrap-break-word lining-nums lg:text-[34px]/none">
              {event.name}
            </h1>
            <div className="flex flex-row flex-wrap items-center gap-2">
              <StatusBadge status={event.status} />
              <Badge variant="outline" className="text-muted-foreground border-border-strong">
                {t("list.songs", { count: songs.length })}
              </Badge>
            </div>
          </div>
          <EventDateTile date={event.date} className="hidden sm:flex" />
        </CardHeader>
        <CardContent>
          <dl className="flex flex-row flex-wrap justify-start gap-x-4 gap-y-2">
            <div className="text-muted-foreground flex flex-row flex-wrap gap-2 text-[13px]">
              <dt className="text-popover-foreground flex flex-row items-center gap-2">
                <UserIcon size={15} />
                {t("Details.header.client")}
              </dt>
              <dd>{event.client.name}</dd>
            </div>
            {playlistInfo.map(({ icon, label, content }, index) => {
              return (
                <div
                  key={index}
                  className="text-muted-foreground flex flex-row flex-wrap gap-2 text-[13px]"
                >
                  <dt className="text-popover-foreground flex flex-row items-center gap-2">
                    {icon}
                    {label}
                  </dt>
                  <dd>
                    {format.dateTime(content, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              );
            })}
          </dl>
        </CardContent>
      </div>
      <CardFooter className="flex-col flex-wrap items-stretch gap-4 sm:flex-row md:min-w-1/3 md:flex-col">
        <div className="flex flex-2 flex-row gap-4 md:flex-none md:flex-col">
          <Button variant="outline" size="sm" className="flex-1 md:flex-none">
            Print
          </Button>
          <Button variant="outline" size="sm" className="flex-1 md:flex-none">
            CSV
          </Button>
        </div>
        <Button size="sm" className="sm:flex-1 md:flex-none">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}

export async function HeaderLabel({ label, date }: { label: string; date: Date }) {
  const format = await getFormatter();

  return (
    <p className="text-accent-foreground text-xs font-semibold tracking-widest break-all">
      {label}
      <span className="sm:hidden">
        <span aria-hidden="true" className="text-accent-foreground/50 mx-1.5">
          ·
        </span>
        <span>{format.dateTime(date, { dateStyle: "short" })}</span>
      </span>
    </p>
  );
}
