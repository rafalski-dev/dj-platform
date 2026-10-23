import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { getTranslations } from "next-intl/server";

export default async function Playlists() {
  const t = await getTranslations("Admin.Playlists");

  const totalPlaylists = 7;

  return (
    <SectionHeader
      title={t("title")}
      label={t("count", { count: totalPlaylists })}
      action={{ btnLabel: t("addingBtn"), pathname: "/admin/playlists/create" }}
    />
  );
}
