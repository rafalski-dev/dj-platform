import { ADDRESS_FIELDS, EVENT_FIELDS, type MissingField } from "@/lib/missingFields";
import { getTranslations } from "next-intl/server";
import { OverviewTaskCard } from "./overviewTaskCard";

// The client's steps – one card per page where they're filled in. A card stays when its group is
// complete, marked as done, so the client sees what's finished and can still edit it.
export async function MissingFieldsTasks({ missing }: { missing: MissingField[] }) {
  const t = await getTranslations("Dashboard.Overview.missingFields");

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
    </div>
  );
}
