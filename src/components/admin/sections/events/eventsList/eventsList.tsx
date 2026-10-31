import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { StatusBadge } from "@/components/admin/shared/statusBadge";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CalendarIcon, MinusIcon, PlusIcon, SearchXIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { EmptyState } from "@/components/admin/shared/emptyState";
import { getPaginatedEvents } from "@/data/events";
import { PersistedParams } from "@/lib/searchParams";

export async function EventsList({ persistedParams }: { persistedParams: PersistedParams }) {
  const t = await getTranslations("Admin");
  const format = await getFormatter();
  const fetchedData = await getPaginatedEvents(
    persistedParams.limit,
    persistedParams.page,
    persistedParams.query,
  );

  function formatHours(startsAt: Date | null, endsAt: Date | null) {
    const time = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" } as const;

    if (startsAt && endsAt) {
      return `${format.dateTime(startsAt, time)} – ${format.dateTime(endsAt, time)}`;
    }
    if (startsAt) return t("Events.card.from", { time: format.dateTime(startsAt, time) });
    if (endsAt) return t("Events.card.until", { time: format.dateTime(endsAt, time) });

    return null;
  }

  if (fetchedData.length === 0) {
    const isFiltered = persistedParams.query ? true : false;

    return isFiltered ? (
      <EmptyState
        icon={<SearchXIcon strokeWidth={1.5} />}
        title={t("EmptyState.noResults.title")}
        description={
          persistedParams.query
            ? t("EmptyState.noResults.descriptionQuery", { query: persistedParams.query })
            : t("EmptyState.noResults.descriptionFilter")
        }
        action={{ label: t("EmptyState.noResults.action"), href: "/admin/events" }}
      />
    ) : (
      <EmptyState
        icon={<CalendarIcon strokeWidth={1.5} />}
        title={t("Events.empty.noEvents.title")}
        description={t("Events.empty.noEvents.description")}
        action={{
          label: t("Events.addingBtn"),
          href: "/admin/events/create",
          icon: <PlusIcon className="size-3" strokeWidth={3} />,
        }}
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {fetchedData.map(
        ({
          id,
          name,
          type,
          altType,
          date,
          status,
          startsAt,
          endsAt,
          place,
          address,
          guestCount,
          package: eventPackage,
        }) => {
          return (
            <li key={id}>
              <Link
                href={{ pathname: "/admin/events/[eventId]", params: { eventId: id } }}
                className="group block h-full rounded-xl"
              >
                <Card
                  size="md"
                  className="group-hover:ring-gold-light/30 h-full gap-5 transition-shadow duration-200"
                >
                  <EventHeaderCard
                    name={name}
                    type={type}
                    altType={altType}
                    status={status}
                    date={date}
                  />

                  <CardContent className="flex flex-1 flex-col gap-5">
                    <dl className="grid grid-cols-3 gap-x-4 gap-y-4">
                      <Detail label={t("Events.card.hours")} emptyLabel={t("Events.card.notSet")}>
                        {formatHours(startsAt, endsAt)}
                      </Detail>
                      <Detail
                        label={t("Events.card.package")}
                        emptyLabel={t("Events.card.notSet")}
                        className="items-center text-center"
                      >
                        {eventPackage}
                      </Detail>
                      <Detail
                        label={t("Events.card.guests")}
                        emptyLabel={t("Events.card.notSet")}
                        className="items-end text-right"
                      >
                        {guestCount}
                      </Detail>
                      <Detail
                        label={t("Events.card.place")}
                        emptyLabel={t("Events.card.notSet")}
                        className="col-span-3"
                      >
                        {`${place}, ${address}`}
                      </Detail>
                    </dl>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        },
      )}
    </ul>
  );
}

type DetailProps = {
  label: string;
  emptyLabel: string;
  className?: string;
  children: React.ReactNode;
};

function Detail({ label, emptyLabel, className, children }: DetailProps) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-1", className)}>
      <dt className="text-popover-foreground text-[11.5px] tracking-wider uppercase">{label}</dt>
      <dd className="text-foreground/85 text-[15px] wrap-break-word">
        {children ?? (
          <>
            <span className="sr-only">{emptyLabel}</span>
            <MinusIcon size={16} strokeWidth={1.6} className="text-popover-foreground" />
          </>
        )}
      </dd>
    </div>
  );
}

type EventItem = Awaited<ReturnType<typeof getPaginatedEvents>>[number];
type EventHeaderCardProps = Pick<EventItem, "name" | "type" | "status" | "date" | "altType">;

async function EventHeaderCard({ name, type, altType, status, date }: EventHeaderCardProps) {
  const t = await getTranslations("Admin.Clients.list.eventTypes");
  const format = await getFormatter();

  const eventType = type === "Other" && altType ? altType : t(type);

  return (
    <CardHeader>
      <div className="flex items-start gap-4 border-b pb-5">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-accent-foreground text-xs font-semibold tracking-widest uppercase">
            {eventType}
          </p>
          <h2 className="text-foreground mb-2 line-clamp-2 text-2xl leading-snug font-medium">
            {name}
          </h2>
          <StatusBadge status={status} className="shrink-0" />
        </div>
        <time
          dateTime={date.toISOString().slice(0, 10)}
          className="border-border-strong bg-foreground/5 flex h-24 w-20 shrink-0 flex-col items-center justify-center gap-px rounded-xl border"
        >
          <span className="text-muted-foreground font-sans text-xs leading-none">
            {format.dateTime(date, { weekday: "long" })}
          </span>
          <span className="text-accent-foreground mt-1 font-serif text-[32px]/9 tracking-wider uppercase lining-nums">
            {format.dateTime(date, { day: "2-digit" })}
          </span>

          <span className="text-muted-foreground text-[11px] leading-none tracking-wider">
            {format.dateTime(date, { year: "numeric", month: "short" })}
          </span>
        </time>
      </div>
    </CardHeader>
  );
}
