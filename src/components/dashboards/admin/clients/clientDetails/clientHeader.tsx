import { DialogButton } from "@/components/dashboards/shared/dialogButton";
import { StatusBadge } from "@/components/dashboards/shared/statusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getClientDetails } from "@/data/singleClient";
import { Link } from "@/i18n/navigation";
import { createInitials, getRelevantEvent } from "@/lib/utils";
import { CalendarIcon, ClockIcon, EditIcon, Trash2Icon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

type ClientHeaderProps = {
  fetchedData: NonNullable<Awaited<ReturnType<typeof getClientDetails>>>;
};

export async function ClientHeader({ fetchedData }: ClientHeaderProps) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Clients.Create");
  const tHeader = await getTranslations("Admin.Clients.Details.header");
  const { id, name, clientType, createdAt, updatedAt, events } = fetchedData;

  const clientInfo = [
    { icon: <CalendarIcon size={15} />, label: tHeader("created"), content: createdAt },
    { icon: <ClockIcon size={15} />, label: tHeader("lastEdited"), content: updatedAt },
  ];

  return (
    <Card size="md" className="md:flex-row md:justify-between">
      <div className="flex flex-col gap-5">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar size="xl">
            <AvatarFallback>{createInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex h-full flex-col justify-between">
            <h1 className="mb-2 font-serif text-[30px]/none lg:text-[34px]/none">{name}</h1>
            <div className="flex flex-row flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="text-muted-foreground border-border-strong rounded-md px-3 text-xs font-semibold tracking-widest uppercase"
              >
                {t(`clientType.options.${clientType}.title`)}
              </Badge>
              <StatusBadge status={getRelevantEvent(events)?.eventStatus ?? "New"} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="flex flex-row flex-wrap justify-start gap-x-4 gap-y-2">
            {clientInfo.map(({ icon, label, content }, index) => {
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
        <Link
          href={{ pathname: "/admin/clients/[clientId]/edit", params: { clientId: id } }}
          className={buttonVariants({ variant: "default", className: "flex-1 md:w-full" })}
        >
          <EditIcon />
          {tHeader("edit")}
        </Link>
        <DialogButton
          label={
            <>
              <Trash2Icon />
              {tHeader("delete")}
            </>
          }
        />
      </CardFooter>
    </Card>
  );
}
