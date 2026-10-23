import { InfoCardSkeleton } from "@/components/admin/skeletons/infoCardSkeleton";
import { useTranslations } from "next-intl";

export function ClientListsSkeleton() {
  const t = useTranslations("Admin.Clients.Details");

  return (
    <>
      <InfoCardSkeleton title={t("events.title")} pathname="/admin/events/create" count={2} />
      <InfoCardSkeleton title={t("contracts.title")} pathname="/admin/contracts/create" count={1} />
      <InfoCardSkeleton title={t("playlists.title")} pathname="/admin/playlists/create" count={1} />
    </>
  );
}
