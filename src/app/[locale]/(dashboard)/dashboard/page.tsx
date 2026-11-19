import { InquiryOverviewCard } from "@/components/client/sections/overview/inquiryOverviewCard";
import { OverviewEmpty } from "@/components/client/sections/overview/overviewEmpty";
import { OverviewWelcome } from "@/components/client/sections/overview/overviewWelcome";
import { getSelectedEventOption } from "@/data/dashboard";

export default async function Dashboard() {
  const selected = await getSelectedEventOption();

  return (
    <>
      <OverviewWelcome />
      {!selected && <OverviewEmpty />}
      {selected?.kind === "inquiry" && <InquiryOverviewCard inquiry={selected} />}
      {/* TODO: event overview – next step */}
    </>
  );
}
