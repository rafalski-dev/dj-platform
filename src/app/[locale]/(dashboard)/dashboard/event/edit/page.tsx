import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { EventDetailsForm } from "@/components/client/sections/event/eventDetailsForm";
import { getEventDetailsToEdit, getSelectedEventOption } from "@/data/dashboard";
import { redirect } from "@/i18n/navigation";
import { toWarsawTime } from "@/lib/utils";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { getLocale, getTranslations } from "next-intl/server";

// Edits the event picked in the nav selector – no id in the URL, so it follows the selector
export default async function EventEdit() {
  const [t, locale, selected] = await Promise.all([
    getTranslations("Dashboard.EventEdit"),
    getLocale(),
    getSelectedEventOption(),
  ]);

  const event = selected?.kind === "event" ? await getEventDetailsToEdit(selected.id) : null;
  // only an inquiry (or nothing) selected – there's no event to edit
  if (!event) return redirect({ href: "/dashboard", locale });

  // a wedding without a ceremony (or another event type) – no ceremony card
  const wedding = event.wedding?.weddingKind !== "None" ? event.wedding : null;
  // "11.12.2026" in both languages – same as the inquiry email, in Warsaw time
  const formatDate = (date: Date) => format(new TZDate(date, "Europe/Warsaw"), "dd.MM.yyyy");

  return (
    <>
      <SectionHeader title={t("title")} />
      <div className="flex w-full flex-col items-center gap-5">
        <EventDetailsForm
          eventId={event.id}
          confirmed={{
            date: formatDate(event.date),
            place: event.place,
            ceremony: wedding
              ? {
                  // no ceremony time yet – the DJ didn't set a separate day, so it's the party day
                  date: formatDate(wedding.ceremonyStartsAt ?? event.date),
                }
              : undefined,
          }}
          defaultValues={{
            startTime: event.startsAt ? toWarsawTime(event.startsAt) : "",
            endTime: event.endsAt ? toWarsawTime(event.endsAt) : "",
            address: event.address ?? "",
            ceremony: wedding
              ? {
                  startTime: wedding.ceremonyStartsAt ? toWarsawTime(wedding.ceremonyStartsAt) : "",
                  place: wedding.ceremonyPlace ?? "",
                  address: wedding.ceremonyAddress ?? "",
                }
              : undefined,
          }}
        />
      </div>
    </>
  );
}
