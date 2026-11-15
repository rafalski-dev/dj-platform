import { EditEventForm } from "@/components/admin/sections/events/eventEdit/editEventForm";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { getEventToEdit } from "@/data/events";
import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function EditEvent({ params }: { params: Promise<{ eventId: string }> }) {
  await adminCheck();
  const { eventId } = await params;
  const t = await getTranslations("Admin.Events.Edit.page");

  const event = await getEventToEdit(eventId);
  if (!event) notFound();

  const clientsList = await db.client.findMany({ select: { name: true, id: true } });

  return (
    <>
      <Breadcrumbs dynamicLabel={event.name} />
      <SectionHeader title={t("title")} description={t("description")} />
      <EditEventForm fetchedData={event} clientsList={clientsList} />
    </>
  );
}
