import { StatusBadge } from "@/components/admin/shared/statusBadge";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card";
import type { EventDetails } from "@/data/events";
import { getStartOfToday } from "@/lib/utils";
import { CalendarIcon, ClockIcon, EditIcon, HistoryIcon, Trash2Icon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { EventDateTile } from "../eventDateTile";
import { DeleteDialog } from "./deleteDialog";

export async function EventHeader({ fetchedData }: { fetchedData: EventDetails }) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Events.Details.header");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const { id, name, type, altType, status, date, createdAt, updatedAt } = fetchedData;

  const eventType = type === "Other" && altType ? altType : tEventTypes(type);

  const eventInfo = [
    { icon: <CalendarIcon size={15} />, label: t("created"), content: createdAt },
    { icon: <ClockIcon size={15} />, label: t("lastEdited"), content: updatedAt },
  ];
  console.log(date);
  console.log(getStartOfToday());
  return (
    <Card size="md" className="md:flex-row md:justify-between">
      <div className="flex w-full min-w-0 flex-col gap-5">
        <CardHeader className="flex flex-row items-center gap-4">
          <EventDateTile date={date} />
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-accent-foreground text-xs font-semibold tracking-widest uppercase">
              {eventType}
            </p>
            <h1 className="font-serif text-[30px]/none wrap-break-word lining-nums lg:text-[34px]/none">
              {name}
            </h1>
            <div className="flex flex-row flex-wrap items-center gap-2">
              <StatusBadge status={status} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="flex flex-row flex-wrap justify-start gap-x-4 gap-y-2">
            {eventInfo.map(({ icon, label, content }, index) => {
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
      <CardFooter className="flex-row flex-wrap gap-4 md:min-w-1/3 md:flex-col">
        <Button disabled className="flex-1 md:w-full md:flex-none">
          <EditIcon />
          {t("edit")}
        </Button>
        <DeleteDialog
          eventId={id}
          label={
            <>
              <Trash2Icon />
              {t("delete")}
            </>
          }
        />
      </CardFooter>
    </Card>
  );
}
