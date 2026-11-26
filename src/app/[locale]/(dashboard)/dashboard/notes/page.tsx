import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { NotesBoard } from "@/components/shared/notes/notesBoard";
import { getSelectedEventOption } from "@/data/dashboard";
import { getEventNotes } from "@/data/notes";
import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/auth-helpers";
import { getLocale, getTranslations } from "next-intl/server";

// Notes of the event picked in the nav selector – shared with the DJ
export default async function DashboardNotes() {
  const [t, locale, session, selected] = await Promise.all([
    getTranslations("Dashboard.Pages"),
    getLocale(),
    getSession(),
    getSelectedEventOption(),
  ]);

  // only a confirmed event has notes (the layout already sends a logged-out user to /login)
  if (!session || selected?.kind !== "event") return redirect({ href: "/dashboard", locale });

  const notes = await getEventNotes(selected.id);

  return (
    <>
      <SectionHeader title={t("notes")} />
      <NotesBoard eventId={selected.id} notes={notes} currentUserId={session.user.id} />
    </>
  );
}
