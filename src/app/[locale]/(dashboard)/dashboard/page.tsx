import { EventOverviewCard } from "@/components/client/sections/overview/eventOverviewCard";
import { InquiryOverviewCard } from "@/components/client/sections/overview/inquiryOverviewCard";
import { MissingFieldsAlert } from "@/components/client/sections/overview/missingFieldsAlert";
import { MissingFieldsTasks } from "@/components/client/sections/overview/missingFieldsTasks";
import { OverviewEmpty } from "@/components/client/sections/overview/overviewEmpty";
import { OverviewWelcome } from "@/components/client/sections/overview/overviewWelcome";
import { getClientContract } from "@/data/contracts";
import { getClientPlaylistSummary } from "@/data/playlists";
import {
  getEventMissingFields,
  getSelectedEventOption,
  getWeddingDetailsToEdit,
} from "@/data/dashboard";

export default async function Dashboard() {
  const selected = await getSelectedEventOption();
  const isWedding = selected?.kind === "event" && selected.type === "Wedding";
  const [missing, contract, playlist, weddingEvent] =
    selected?.kind === "event"
      ? await Promise.all([
          getEventMissingFields(selected.id),
          getClientContract(),
          getClientPlaylistSummary(),
          isWedding ? getWeddingDetailsToEdit(selected.id) : null,
        ])
      : [[], null, null, null];
  const couple = weddingEvent?.wedding;

  return (
    <>
      <OverviewWelcome />
      {!selected && <OverviewEmpty />}
      {selected?.kind === "inquiry" && <InquiryOverviewCard inquiry={selected} />}
      {selected?.kind === "event" && (
        <>
          <EventOverviewCard event={selected} />
          {missing.length > 0 && <MissingFieldsAlert count={missing.length} />}
          <MissingFieldsTasks
            missing={missing}
            contractStatus={contract?.status ?? null}
            playlist={playlist && { status: playlist.status, songs: playlist._count.songs }}
            wedding={isWedding ? { coupleDone: !!(couple?.bride && couple.groom) } : undefined}
          />
        </>
      )}
    </>
  );
}
