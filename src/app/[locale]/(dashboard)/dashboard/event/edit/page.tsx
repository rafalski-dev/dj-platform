import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { EventDetailsForm } from "@/components/client/sections/event/eventDetailsForm";
import { MissingEventFieldsAlert } from "@/components/client/sections/event/missingEventFieldsAlert";
import {
  getEventDetailsToEdit,
  getEventMissingFields,
  getSelectedEventOption,
} from "@/data/dashboard";
import { redirect } from "@/i18n/navigation";
import { EVENT_FIELDS } from "@/lib/missingFields";
import { toWarsawTime } from "@/lib/utils";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";

// Edits the event picked in the nav selector – no id in the URL, so it follows the selector
export default async function EventEdit() {
  const [t, format, locale, selected] = await Promise.all([
    getTranslations("Dashboard.EventEdit"),
    getFormatter(),
    getLocale(),
    getSelectedEventOption(),
  ]);

  const event = selected?.kind === "event" ? await getEventDetailsToEdit(selected.id) : null;
  // only an inquiry (or nothing) selected – there's no event to edit
  if (!event) return redirect({ href: "/dashboard", locale });

  // only the fields of this page – the home address is filled in on My details
  const missing = (await getEventMissingFields(event.id)).filter((field) =>
    EVENT_FIELDS.includes(field),
  );

  return (
    <>
      <SectionHeader
        title={t("title")}
        description={`${event.name} · ${format.dateTime(event.date, { dateStyle: "long" })}`}
      />
      <div className="flex w-full flex-col items-center gap-5">
        {missing.length > 0 && <MissingEventFieldsAlert missing={missing} />}
        <EventDetailsForm
          eventId={event.id}
          missing={missing}
          defaultValues={{
            startTime: event.startsAt ? toWarsawTime(event.startsAt) : "",
            endTime: event.endsAt ? toWarsawTime(event.endsAt) : "",
            address: event.address ?? "",
          }}
        />
      </div>
    </>
  );
}
