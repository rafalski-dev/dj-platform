import type { ClientEventOption } from "@/data/dashboard";
import { getFormatter, getTranslations } from "next-intl/server";
import { DaysLeftTile } from "./daysLeftTile";
import { OverviewCard } from "./overviewCard";

type InquiryOption = Extract<ClientEventOption, { kind: "inquiry" }>;

// The client sent an inquiry and the DJ hasn't confirmed it yet – read-only summary
export async function InquiryOverviewCard({ inquiry }: { inquiry: InquiryOption }) {
  const t = await getTranslations("Dashboard.Overview.inquiry");
  const tTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const format = await getFormatter();

  return (
    <OverviewCard
      badge={t("status")}
      label={tTypes(inquiry.type)}
      title={format.dateTime(inquiry.date, { dateStyle: "long" })}
      aside={<DaysLeftTile date={inquiry.date} />}
    >
      <p className="text-muted-foreground -mt-2 text-[15px] font-light wrap-break-word">
        {inquiry.place}
      </p>
      <p className="text-popover-foreground/80 text-xs font-light">{t("description")}</p>
    </OverviewCard>
  );
}
