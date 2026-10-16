import { ArrowRight, MailIcon, PhoneIcon, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { createInitials, phoneNumberSplitting } from "@/lib/utils";
import { getFormatter, getTranslations } from "next-intl/server";
import { ClientsTableHeader } from "@/components/dashboards/admin/clients/tableClients/clientsTableHeader";
import { StatusBadge } from "@/components/dashboards/shared/statusBadge";
import { buttonVariants } from "@/components/ui/button";
import { ClientWithEvent } from "@/types/dashboard";
import { Link } from "@/i18n/navigation";

type ClientsTableProps = {
  sortedEvents: ClientWithEvent[];
  selectEmptyState: React.ReactNode;
};

export async function ClientsTable({ sortedEvents, selectEmptyState }: ClientsTableProps) {
  const t = await getTranslations("Admin.Clients");
  const format = await getFormatter();
  const iconSizes = 16;

  return (
    <div className="hidden lg:block">
      <Table className="table-fixed">
        <ClientsTableHeader />
        <TableBody>
          {sortedEvents.length === 0 ? (
            // results no exists
            <TableRow className="hover:bg-card">
              <TableCell colSpan={5} className="whitespace-normal">
                {selectEmptyState}
              </TableCell>
            </TableRow>
          ) : (
            // results exists
            sortedEvents.map(({ id, name, email, phone, event }) => {
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
                          <MailIcon size={iconSizes} className="text-muted-foreground/50" />
                          <span className="truncate">{email}</span>
                        </div>
                      ) : (
                        <div className="text-muted-foreground/50 flex items-center gap-2">
                          <PlusIcon size={iconSizes} />
                          <span>{t("list.addEmail")}</span>
                        </div>
                      )}
                      {formattedPhoneNumber ? (
                        <div className="flex items-center gap-2">
                          <PhoneIcon size={iconSizes} className="text-muted-foreground/50" />
                          <span>{formattedPhoneNumber}</span>
                        </div>
                      ) : (
                        <div className="text-muted-foreground/50 flex items-center gap-2">
                          <PlusIcon size={iconSizes} />
                          <span>{t("list.addPhone")}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {event ? (
                      <>
                        <div className="text-foreground/80 truncate">
                          {t(`list.eventTypes.${event.eventType}`)}
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
                      <div className="text-popover-foreground">{t("list.noEvent")}</div>
                    )}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {event ? (
                      <StatusBadge status={event.eventStatus} />
                    ) : (
                      <StatusBadge status="New" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={{ pathname: "/admin/clients/[clientId]", params: { clientId: id } }}
                      className={buttonVariants({ variant: "secondary", size: "icon" })}
                      aria-label={t("list.details", { name })}
                    >
                      <ArrowRight className="text-muted-foreground group-hover:text-accent-foreground size-5 transition-colors" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
