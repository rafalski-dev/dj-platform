import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export async function ClientsTableHeader() {
  const t = await getTranslations("Admin.Clients");

  return (
    <TableHeader>
      <TableRow className="hover:bg-card">
        <TableHead className="w-[30%] xl:w-[25%]">{t("table.headers.client")}</TableHead>
        <TableHead className="w-[40%] xl:w-[32.5%]">{t("table.headers.contact")}</TableHead>
        <TableHead className="w-[20%]">{t("table.headers.event")}</TableHead>
        <TableHead className="hidden xl:table-cell">{t("table.headers.status")}</TableHead>
        <TableHead className="w-16 text-right">{t("table.headers.more")}</TableHead>
      </TableRow>
    </TableHeader>
  );
}
