import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { getTranslations } from "next-intl/server";

export default async function DashboardContracts() {
  const t = await getTranslations("Dashboard.Pages");

  return <SectionHeader title={t("contracts")} />;
}
