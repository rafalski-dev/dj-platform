import { EmptyState } from "@/components/admin/shared/emptyState";
import { EventDateTile } from "@/components/admin/shared/eventDateTile";
import { DateTakenBadge, InquiryStatusBadge } from "@/components/admin/shared/inquiryStatusBadge";
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { getPaginatedInquiries } from "@/data/inquiries";
import { Link } from "@/i18n/navigation";
import { InquiryFilterType, PersistedParams } from "@/lib/searchParams";
import { InboxIcon, SearchXIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

export async function InquiriesList({
  persistedParams,
}: {
  persistedParams: PersistedParams<InquiryFilterType>;
}) {
  const t = await getTranslations("Admin");
  const format = await getFormatter();
  const fetchedData = await getPaginatedInquiries(
    persistedParams.limit,
    persistedParams.page,
    persistedParams.query,
    persistedParams.filter,
  );

  if (fetchedData.length === 0) {
    return persistedParams.query ? (
      <EmptyState
        icon={<SearchXIcon strokeWidth={1.5} />}
        title={t("EmptyState.noResults.title")}
        description={t("EmptyState.noResults.descriptionQuery", { query: persistedParams.query })}
        action={{ label: t("EmptyState.noResults.action"), href: "/admin/inquiries" }}
      />
    ) : (
      <EmptyState
        icon={<InboxIcon strokeWidth={1.5} />}
        title={t("Inquiries.empty.noInquiries.title")}
        description={t("Inquiries.empty.noInquiries.description")}
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {fetchedData.map(
        ({ id, status, firstName, lastName, date, type, place, createdAt, isDateTaken }) => (
          <li key={id}>
            <Link
              href={{ pathname: "/admin/inquiries/[inquiryId]", params: { inquiryId: id } }}
              className="group block h-full rounded-xl"
            >
              <Card
                size="md"
                className="group-hover:ring-gold-light/30 h-full gap-5 transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex items-start gap-4 border-b pb-5">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <p className="text-accent-foreground text-xs font-semibold tracking-widest uppercase">
                        {t(`Clients.list.eventTypes.${type}`)}
                      </p>
                      <h2 className="text-foreground mb-2 line-clamp-2 text-2xl leading-snug font-medium">
                        {firstName} {lastName}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <InquiryStatusBadge status={status} />
                        {isDateTaken && <DateTakenBadge />}
                      </div>
                    </div>
                    <EventDateTile date={date} />
                  </div>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-3 gap-x-4">
                    <div className="col-span-2 flex min-w-0 flex-col items-start gap-1">
                      <dt className="text-popover-foreground text-[11.5px] tracking-wider uppercase">
                        {t("Inquiries.card.place")}
                      </dt>
                      <dd className="text-foreground/85 text-[15px] wrap-break-word">{place}</dd>
                    </div>
                    <div className="flex min-w-0 flex-col items-end gap-1 text-right">
                      <dt className="text-popover-foreground text-[11.5px] tracking-wider uppercase">
                        {t("Inquiries.card.received")}
                      </dt>
                      <dd className="text-foreground/85 text-[15px]">
                        {format.relativeTime(createdAt)}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}
