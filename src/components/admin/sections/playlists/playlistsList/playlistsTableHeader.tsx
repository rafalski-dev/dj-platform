import { TableHead, TableHeader, TableRow } from "@/components/ui/shadcn/table";
import { getTranslations } from "next-intl/server";

export async function PlaylistsTableHeader() {
  const t = await getTranslations("Admin.Playlists");

  return (
    <TableHeader>
      <TableRow className="hover:bg-card">
        <TableHead className="w-[32%] xl:w-[28%]">{t("table.headers.playlist")}</TableHead>
        <TableHead className="w-[28%] xl:w-[24%]">{t("table.headers.event")}</TableHead>
        <TableHead className="w-[28%] xl:w-[22%]">{t("table.headers.client")}</TableHead>
        <TableHead className="hidden xl:table-cell">{t("table.headers.status")}</TableHead>
        <TableHead className="text-right">{t("table.headers.more")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
