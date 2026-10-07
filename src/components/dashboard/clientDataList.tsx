import { ArrowRight, MailIcon, PhoneIcon, PlusIcon, SearchXIcon, UsersIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { createInitials, phoneNumberSplitting } from "@/lib/utils";
import { Button } from "../ui/button";
import { StatusBadge } from "./statusBadge";
import { getFormatter, getTranslations } from "next-intl/server";
import { ShowEmpty } from "./empty";
import { PersistedParams } from "@/lib/searchParams";
import { getPaginationedClients, getStartOfToday } from "@/data/clients";

type ClientWithEvents = Awaited<ReturnType<typeof getPaginationedClients>>[number];

type ClientDataListProps = {
  data: ClientWithEvents[];
  persistedParams: PersistedParams;
};

export async function ClientDataList({
  data,
  persistedParams: { query, filter },
}: ClientDataListProps) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Clients");
  const iconSize = 16;
  const today = getStartOfToday();

  const noClients = (
    <TableRow className="hover:bg-card">
      <TableCell colSpan={5} className="whitespace-normal">
        <ShowEmpty
          icon={<UsersIcon strokeWidth={1.5} />}
          title={t("empty.noClients.title")}
          description={t("empty.noClients.description")}
          action={{
            label: t("addingBtn"),
            href: "/admin/clients",
            icon: <PlusIcon className="size-3" strokeWidth={3} />,
          }}
        />
      </TableCell>
    </TableRow>
  );

  const noResults = (
    <TableRow className="hover:bg-card">
      <TableCell colSpan={5} className="whitespace-normal">
        <ShowEmpty
          icon={<SearchXIcon strokeWidth={1.5} />}
          title={t("empty.noResults.title")}
          description={
            query
              ? t("empty.noResults.descriptionQuery", { query })
              : t("empty.noResults.descriptionFilter")
          }
          action={{ label: t("empty.noResults.action"), href: "/admin/clients" }}
        />
      </TableCell>
    </TableRow>
  );

  const isFiltered = query || filter ? true : false;
  const selectEmptyState = isFiltered ? noResults : noClients;

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="hover:bg-card">
          <TableHead className="w-[30%] xl:w-[25%]">{t("table.headers.client")}</TableHead>
          <TableHead className="w-[40%] xl:w-[32.5%]">{t("table.headers.contact")}</TableHead>
          <TableHead className="w-[20%]">{t("table.headers.event")}</TableHead>
          <TableHead className="hidden xl:table-cell">{t("table.headers.status")}</TableHead>
          <TableHead className="w-16 text-right">{t("table.headers.more")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0
          ? selectEmptyState
          : data.map(({ id, name, email, phone, events }) => {
              const notCancelled = events.filter((e) => e.eventStatus !== "Cancelled");
              const nextEvent = notCancelled.find((e) => e.eventDate >= today);
              const event = nextEvent ?? notCancelled.at(-1) ?? events.at(-1);

              const formattedPhoneNumber = phoneNumberSplitting(phone);
              return (
                <TableRow key={id} className="group">
                  <TableCell className="text-foreground">
                    <div className="flex flex-row items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback>{createInitials(name)}</AvatarFallback>
                      </Avatar>
                      <span className="truncate text-sm">{name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      {email ? (
                        <div className="flex items-center gap-2">
                          <MailIcon size={iconSize} className="text-muted-foreground/50" />
                          <span className="truncate">{email}</span>
                        </div>
                      ) : (
                        <div className="text-muted-foreground/50 flex items-center gap-2">
                          <PlusIcon size={iconSize} />
                          <span>{t("table.addEmail")}</span>
                        </div>
                      )}
                      {formattedPhoneNumber ? (
                        <div className="flex items-center gap-2">
                          <PhoneIcon size={iconSize} className="text-muted-foreground/50" />
                          <span>{formattedPhoneNumber}</span>
                        </div>
                      ) : (
                        <div className="text-muted-foreground/50 flex items-center gap-2">
                          <PlusIcon size={iconSize} />
                          <span>{t("table.addPhone")}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {event ? (
                      <>
                        <div className="text-foreground/80 truncate">
                          {t(`table.eventTypes.${event.eventType}`)}
                        </div>
                        <div className="truncate">
                          {format.dateTime(event.eventDate, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            weekday: "short",
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="text-popover-foreground">{t("table.noEvent")}</div>
                    )}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {event ? (
                      <StatusBadge status={event.eventStatus} />
                    ) : (
                      <StatusBadge status="New" />
                    )}
                  </TableCell>
                  <TableCell className="pr-0">
                    <Button
                      variant="secondary"
                      size="icon"
                      aria-label={t("table.details", { name })}
                    >
                      <ArrowRight className="text-muted-foreground group-hover:text-accent-foreground size-5 pr-0 transition-colors" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
}
