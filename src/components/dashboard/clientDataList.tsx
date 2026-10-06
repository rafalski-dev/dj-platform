import { ArrowRight, MailIcon, PhoneIcon, PlusIcon, SearchXIcon, UsersIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { createInitials, phoneNumberSplitting } from "@/lib/utils";
import { Button } from "../ui/button";
import { StatusBadge } from "./statusBadge";
import { getPaginationedClients } from "@/data/clients";
import { getFormatter } from "next-intl/server";
import { ShowEmpty } from "./empty";

// Typ wyliczony z funkcji pobierającej dane – klient razem z jego wydarzeniami (include: { events: true })
type ClientWithEvents = Awaited<ReturnType<typeof getPaginationedClients>>[number];

export async function ClientDataList({
  data,
  totalClients,
  query,
}: {
  data: ClientWithEvents[];
  totalClients: number;
  query?: string;
}) {
  const format = await getFormatter();
  const iconSize = 16;

  const noClients = (
    <TableRow className="hover:bg-card">
      <TableCell colSpan={5} className="whitespace-normal">
        <ShowEmpty
          icon={<UsersIcon strokeWidth={1.5} />}
          title="No clients yet"
          description="You haven't added any clients yet. Get started by adding your first client."
          action={{
            label: "Add client",
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
          title="No clients found"
          description={`No clients match “${query}”.`}
          action={{ label: "Clear search", href: "/admin/clients" }}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="hover:bg-card">
          <TableHead className="w-[30%]">Client</TableHead>
          <TableHead className="w-[35%]">Contact</TableHead>
          <TableHead className="w-[20%]">Event</TableHead>
          <TableHead className="w-[20%]">Status</TableHead>
          <TableHead className="w-[5%]">More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {totalClients === 0
          ? query
            ? noResults
            : noClients
          : data.map(({ id, name, email, phone, events }) => {
              const notCancelled = events.filter((e) => e.eventStatus !== "Cancelled");
              const nextEvent = notCancelled.find((e) => e.eventDate >= new Date());
              const event = nextEvent ?? notCancelled.at(-1);
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
                          <span>Add email</span>
                        </div>
                      )}
                      {phoneNumberSplitting(phone) ? (
                        <div className="flex items-center gap-2">
                          <PhoneIcon size={iconSize} className="text-muted-foreground/50" />
                          <span>{phoneNumberSplitting(phone)}</span>
                        </div>
                      ) : (
                        <div className="text-muted-foreground/50 flex items-center gap-2">
                          <PlusIcon size={iconSize} />
                          <span>Add phone</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {event ? (
                      <>
                        <div className="text-foreground/80">{event.eventType}</div>
                        <div>
                          {format.dateTime(event.eventDate, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            weekday: "short",
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="text-popover-foreground">No event</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {event ? (
                      <StatusBadge status={event.eventStatus} />
                    ) : (
                      <StatusBadge status="New" />
                    )}
                  </TableCell>
                  <TableCell className="pr-0">
                    <Button variant="secondary" size="icon">
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
