import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { BreadcrumbsSkeleton } from "@/components/admin/skeletons/breadcrumbsSkeleton";
import { ClientFormSkeleton } from "@/components/admin/skeletons/clientFormSkeleton";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Admin.Clients.Edit.page");

  return (
    <>
      <BreadcrumbsSkeleton />
      <SectionHeader title={t("title")} description={t("description")} />
      <ClientFormSkeleton />
    </>
  );
}
