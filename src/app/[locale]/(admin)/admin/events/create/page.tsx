import { CreateEventForm } from "@/components/admin/sections/events/eventCreate/formSection";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export default async function CreateEvent() {
  await adminCheck();
  const t = await getTranslations("Admin.Events.Create.page");

  const clientsList = await db.client.findMany({ select: { name: true, id: true } });

  return (
    <>
      <Breadcrumbs />
      <SectionHeader title={t("title")} description={t("description")} />
      <CreateEventForm clientsList={clientsList} />
    </>
  );
}
