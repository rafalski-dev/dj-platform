import { EventOverviewCard } from "@/components/client/sections/overview/eventOverviewCard";
import { InquiryOverviewCard } from "@/components/client/sections/overview/inquiryOverviewCard";
import { MissingFieldsAlert } from "@/components/client/sections/overview/missingFieldsAlert";
import { MissingFieldsTasks } from "@/components/client/sections/overview/missingFieldsTasks";
import { OverviewEmpty } from "@/components/client/sections/overview/overviewEmpty";
import { OverviewWelcome } from "@/components/client/sections/overview/overviewWelcome";
import { getClientContract } from "@/data/contracts";
import { getEventMissingFields, getSelectedEventOption } from "@/data/dashboard";

export default async function Dashboard() {
  const selected = await getSelectedEventOption();
  const [missing, contract] =
    selected?.kind === "event"
      ? await Promise.all([getEventMissingFields(selected.id), getClientContract()])
      : [[], null];

  return (
    <>
      <OverviewWelcome />
      {!selected && <OverviewEmpty />}
      {selected?.kind === "inquiry" && <InquiryOverviewCard inquiry={selected} />}
      {selected?.kind === "event" && (
        <>
          <EventOverviewCard event={selected} />
          {missing.length > 0 && <MissingFieldsAlert count={missing.length} />}
          <MissingFieldsTasks missing={missing} contractStatus={contract?.status ?? null} />
        </>
      )}
    </>
  );
}
