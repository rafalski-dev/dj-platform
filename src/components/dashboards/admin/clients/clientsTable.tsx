import { ArrowRight, MailIcon, PhoneIcon, PlusIcon, SearchXIcon, UsersIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { createInitials, phoneNumberSplitting } from "@/lib/utils";

import { getFormatter, getTranslations } from "next-intl/server";
import { PersistedParams } from "@/lib/searchParams";
import { getPaginationedClients, getStartOfToday } from "@/data/clients";
import { ClientsTableHeader } from "@/components/dashboards/admin/clients/clientsTableHeader";
import { ShowEmpty } from "@/components/dashboards/shared/empty";
import { StatusBadge } from "@/components/dashboards/shared/statusBadge";
import { Button } from "@/components/ui/button";

type ClientsTableProps = {
  persistedParams: PersistedParams;
};

export async function ClientsTable({
  persistedParams: { limit, page, query, filter },
}: ClientsTableProps) {
  const t = await getTranslations("Admin.Clients");

  const format = await getFormatter();
  const iconSize = 16;
  const today = getStartOfToday();

  const data = await getPaginationedClients(limit, page, query, filter);

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
      <ClientsTableHeader />
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
                      <ArrowRight className="text-muted-foreground group-hover:text-accent-foreground size-5 transition-colors" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
}
