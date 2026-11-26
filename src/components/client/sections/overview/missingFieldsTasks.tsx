import { ADDRESS_FIELDS, EVENT_FIELDS, type MissingField } from "@/lib/missingFields";
import type { ContractStatus, PlaylistStatus } from "../../../../../generated";
import { getTranslations } from "next-intl/server";
import { OverviewTaskCard } from "./overviewTaskCard";

// The client's steps – one card per page where they're filled in. A card stays when its group is
// complete, marked as done, so the client sees what's finished and can still edit it.
// The contract step follows the contract status – no contract (or a Draft) means the DJ is on it.
export async function MissingFieldsTasks({
  missing,
  contractStatus,
  playlist,
  wedding,
}: {
  missing: MissingField[];
  contractStatus: ContractStatus | null;
  playlist: { status: PlaylistStatus; songs: number } | null;
  // only for a wedding – done once the couple's names are in
  wedding?: { coupleDone: boolean };
}) {
  const t = await getTranslations("Dashboard.Overview.missingFields");
  const tContract = await getTranslations("Dashboard.Overview.contract");
  const tPlaylist = await getTranslations("Dashboard.Overview.playlist");
  const tWedding = await getTranslations("Dashboard.Overview.wedding");

  const missingEvent = missing.filter((field) => EVENT_FIELDS.includes(field));
  const addressDone = !missing.some((field) => ADDRESS_FIELDS.includes(field));
  const eventDone = missingEvent.length === 0;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <OverviewTaskCard
        done={addressDone}
        label={t("address.label")}
        title={t("address.title")}
        description={addressDone ? t("doneDescription") : t("address.description")}
        action={{
          label: addressDone ? t("edit") : t("address.action"),
          pathname: "/dashboard/account/details",
        }}
      />
      <OverviewTaskCard
        done={eventDone}
        label={t("event.label")}
        title={t("event.title")}
        // lists only what's missing, e.g. "Missing: event hours, venue address"
        description={
          eventDone
            ? t("doneDescription")
            : t("event.description", {
                fields: missingEvent.map((field) => t(`fields.${field}`)).join(", "),
              })
        }
        action={{
          label: eventDone ? t("edit") : t("event.action"),
          pathname: "/dashboard/event/edit",
        }}
      />
      <ContractTaskCard status={contractStatus} t={tContract} />
      {wedding && (
        <OverviewTaskCard
          done={wedding.coupleDone}
          label={tWedding("label")}
          title={tWedding("title")}
          description={tWedding(wedding.coupleDone ? "doneDescription" : "description")}
          action={{
            label: wedding.coupleDone ? t("edit") : tWedding("action"),
            pathname: "/dashboard/wedding",
          }}
        />
      )}
      <PlaylistTaskCard playlist={playlist} t={tPlaylist} />
    </div>
  );
}

function ContractTaskCard({
  status,
  t,
}: {
  status: ContractStatus | null;
  t: Awaited<ReturnType<typeof getTranslations<"Dashboard.Overview.contract">>>;
}) {
  // signed by the client is done for them – confirming is the DJ's part
  const done = status === "Signed" || status === "Accepted";
  const state =
    status === "Accepted"
      ? "accepted"
      : status === "Signed"
        ? "signed"
        : status === "Sent"
          ? "ready"
          : "waiting";

  return (
    <OverviewTaskCard
      done={done}
      label={t("label")}
      title={t("title")}
      description={t(`${state}.description`)}
      action={
        state === "waiting"
          ? undefined
          : { label: t(`${state}.action`), pathname: "/dashboard/contracts" }
      }
    />
  );
}

// The client's part is choosing songs – done once there's at least one; they can keep editing
// until the DJ locks the playlist.
function PlaylistTaskCard({
  playlist,
  t,
}: {
  playlist: { status: PlaylistStatus; songs: number } | null;
  t: Awaited<ReturnType<typeof getTranslations<"Dashboard.Overview.playlist">>>;
}) {
  const songs = playlist?.songs ?? 0;
  const state = playlist?.status === "Locked" ? "locked" : songs > 0 ? "started" : "empty";

  return (
    <OverviewTaskCard
      done={state !== "empty"}
      label={t("label")}
      title={t("title")}
      description={t(`${state}.description`, { count: songs })}
      action={{ label: t(`${state}.action`), pathname: "/dashboard/playlists" }}
    />
  );
}
