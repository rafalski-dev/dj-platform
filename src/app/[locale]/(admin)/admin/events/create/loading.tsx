import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { BreadcrumbsSkeleton } from "@/components/admin/skeletons/breadcrumbsSkeleton";
import { CreateEventFormSkeleton } from "@/components/admin/skeletons/createEventFormSkeleton";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Admin.Events.Create.page");

  return (
    <>
      <BreadcrumbsSkeleton />
      <SectionHeader title={t("title")} description={t("description")} />
      <CreateEventFormSkeleton />
    </>
  );
}
