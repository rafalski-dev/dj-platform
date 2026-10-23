import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { getTranslations } from "next-intl/server";

export default async function PersonalDetails() {
  const t = await getTranslations("Admin.PersonalDetails");

  return <SectionHeader title={t("title")} description={t("description")} />;
}
