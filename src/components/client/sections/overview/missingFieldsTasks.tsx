import { ADDRESS_FIELDS, EVENT_FIELDS, type MissingField } from "@/lib/missingFields";
import type { ContractStatus } from "../../../../../generated";
import { getTranslations } from "next-intl/server";
import { OverviewTaskCard } from "./overviewTaskCard";

// The client's steps – one card per page where they're filled in. A card stays when its group is
// complete, marked as done, so the client sees what's finished and can still edit it.
// The contract step follows the contract status – no contract (or a Draft) means the DJ is on it.
export async function MissingFieldsTasks({
  missing,
  contractStatus,
}: {
  missing: MissingField[];
  contractStatus: ContractStatus | null;
}) {
  const t = await getTranslations("Dashboard.Overview.missingFields");
  const tContract = await getTranslations("Dashboard.Overview.contract");

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
