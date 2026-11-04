import { EmptyState } from "@/components/admin/shared/emptyState";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("Admin.Playlists.empty.notFound");
  return (
    <EmptyState
      title={t("title")}
      description={t("description")}
      action={{ label: t("action"), href: "/admin/playlists" }}
    />
  );
}
