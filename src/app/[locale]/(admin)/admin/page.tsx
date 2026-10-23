import { HomeStatsCards } from "@/components/admin/sections/home/homeStatsCards";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { adminCheck } from "@/lib/auth-helpers";
import { getTranslations } from "next-intl/server";

export default async function Admin() {
  const session = await adminCheck();
  const name = session.user.name;
  const t = await getTranslations("Admin.Home");

  return (
    <>
      <SectionHeader title={t("title")} label={t("label", { name })} />
      <HomeStatsCards />
    </>
  );
}
