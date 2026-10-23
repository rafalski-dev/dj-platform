import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { getTranslations } from "next-intl/server";

export default async function Events() {
  const t = await getTranslations("Admin.Events");

  const countEvents = 3;

  return (
    <>
      <SectionHeader
        title={t("title")}
        label={t("label", { events: countEvents })}
        action={{ btnLabel: t("addingBtn"), pathname: "/admin/events/create" }}
      />
    </>
  );
}
