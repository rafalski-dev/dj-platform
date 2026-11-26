import { EventClient } from "@/components/admin/sections/events/eventDetails/eventClient";
import { EventDateAndPlace } from "@/components/admin/sections/events/eventDetails/eventDateAndPlace";
import { EventHeader } from "@/components/admin/sections/events/eventDetails/eventHeader";
import {
  EventContractCard,
  EventPlaylistCard,
} from "@/components/admin/sections/events/eventDetails/eventInfoLists";
import { EventPackage } from "@/components/admin/sections/events/eventDetails/eventPackage";
import { EventWeddingDetails } from "@/components/admin/sections/events/eventDetails/eventWeddingDetails";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { NotesBoard } from "@/components/shared/notes/notesBoard";
import { getEventDetails } from "@/data/events";
import { getEventNotes } from "@/data/notes";
import { adminCheck } from "@/lib/auth-helpers";
import { notFound } from "next/navigation";

export default async function Event({
  params,
}: {
  params: Promise<{ locale: string; eventId: string }>;
}) {
  const { eventId } = await params;

  const [session, event, notes] = await Promise.all([
    adminCheck(),
    getEventDetails(eventId),
    getEventNotes(eventId),
  ]);
  if (!event) notFound();

  return (
    <>
      <Breadcrumbs dynamicLabel={event.name} />
      <EventHeader fetchedData={event} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        <div className="flex min-w-0 flex-col gap-5">
          <EventDateAndPlace fetchedData={event} />
          {event.wedding && <EventWeddingDetails fetchedData={event.wedding} />}
          <EventPackage fetchedData={event} />
          <NotesBoard eventId={event.id} notes={notes} currentUserId={session.user.id} />
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <EventClient fetchedData={event.client} />
          <EventContractCard fetchedData={event.contract} />
          <EventPlaylistCard fetchedData={event.playlist} />
        </div>
      </div>
    </>
  );
}
