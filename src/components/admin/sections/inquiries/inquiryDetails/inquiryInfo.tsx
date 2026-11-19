import { EventDetailRow } from "@/components/admin/sections/events/eventDetails/eventDetailRow";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { InquiryDetails } from "@/data/inquiries";
import { getFormatter, getTranslations } from "next-intl/server";

export async function InquiryInfo({ fetchedData }: { fetchedData: InquiryDetails }) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Inquiries.Details.info");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const { date, type, place, address, message, termsAcceptedAt } = fetchedData;

  return (
    <Card size="md">
      <GeneralCardHeader title={t("title")} />
      <CardContent className="flex flex-col gap-5">
        <dl>
          <EventDetailRow label={t("date")}>
            {format.dateTime(date, {
              weekday: "short",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </EventDetailRow>
          <EventDetailRow label={t("type")}>{tEventTypes(type)}</EventDetailRow>
          <EventDetailRow label={t("place")}>{place}</EventDetailRow>
          {/* inquiries sent before the address field have none */}
          <EventDetailRow label={t("address")}>{address || "—"}</EventDetailRow>
          <EventDetailRow label={t("consent")}>
            {format.dateTime(termsAcceptedAt, {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </EventDetailRow>
        </dl>
        <div>
          <h3 className="text-accent-foreground mb-2 font-sans text-[13px] font-semibold uppercase">
            {t("message")}
          </h3>
          <p className="text-foreground/85 text-[15px] whitespace-pre-line">
            {message || <span className="text-muted-foreground">{t("noMessage")}</span>}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
