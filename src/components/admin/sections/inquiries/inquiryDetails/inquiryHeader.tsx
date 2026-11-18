import { EventDateTile } from "@/components/admin/shared/eventDateTile";
import { DateTakenBadge, InquiryStatusBadge } from "@/components/admin/shared/inquiryStatusBadge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card";
import type { InquiryDetails } from "@/data/inquiries";
import { InboxIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { InquiryActions } from "./inquiryActions";

export async function InquiryHeader({ fetchedData }: { fetchedData: InquiryDetails }) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Inquiries.Details.header");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const { id, status, firstName, lastName, type, date, createdAt, isDateTaken } = fetchedData;

  return (
    <Card size="md">
      <div className="flex w-full min-w-0 flex-col gap-5">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-accent-foreground text-xs font-semibold tracking-widest uppercase">
              {tEventTypes(type)}
            </p>
            <h1 className="font-serif text-[30px]/none wrap-break-word lg:text-[34px]/none">
              {firstName} {lastName}
            </h1>
            <div className="flex flex-row flex-wrap items-center gap-2">
              <InquiryStatusBadge status={status} />
              {isDateTaken && <DateTakenBadge />}
            </div>
          </div>
          <EventDateTile date={date} />
        </CardHeader>
        <CardContent>
          <dl className="text-muted-foreground flex flex-row flex-wrap gap-2 text-[13px]">
            <dt className="text-popover-foreground flex flex-row items-center gap-2">
              <InboxIcon size={15} />
              {t("received")}
            </dt>
            <dd>
              {format.dateTime(createdAt, {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </dd>
          </dl>
        </CardContent>
      </div>
      {/* decisions only while the inquiry is new */}
      {status === "New" && (
        <CardFooter className="mx-(--card-spacing) gap-3 border-t px-0 pt-5">
          <InquiryActions inquiryId={id} isDateTaken={isDateTaken} />
        </CardFooter>
      )}
    </Card>
  );
}
