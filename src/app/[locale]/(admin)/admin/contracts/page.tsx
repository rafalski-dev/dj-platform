import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { getTranslations } from "next-intl/server";

export default async function Contracts() {
  const t = await getTranslations("Admin.Contracts");

  const totalContracts = 5;

  return (
    <SectionHeader
      title={t("title")}
      label={t("count", { count: totalContracts })}
      action={{ btnLabel: t("addingBtn"), pathname: "/admin/contracts/create" }}
    />
  );
}
