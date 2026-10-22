import { PageHeader } from "@/components/dashboards/shared/pageHeader";
import { BreadcrumbsSkeleton } from "@/components/dashboards/skeletons/breadcrumbsSkeleton";
import { ClientFormSkeleton } from "@/components/dashboards/skeletons/clientFormSkeleton";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Admin.Clients.Edit.page");

  return (
    <>
      <BreadcrumbsSkeleton />
      <PageHeader title={t("title")} description={t("description")} />
      <ClientFormSkeleton />
    </>
  );
}
