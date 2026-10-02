import { CardsList } from "@/components/dashboard/cardsList";
import { ClientDataList } from "@/components/dashboard/clientDataList";
import { Filters } from "@/components/dashboard/filters";
import { RowsPerPage } from "@/components/dashboard/RowsPerPage";
import { SearchBar } from "@/components/dashboard/searchBar";
import { ServerPagination } from "@/components/dashboard/serverPagination";
import { PageHeader } from "@/components/dashboard/shared/pageHeader";
import { clientsCardData } from "@/constants/dashboard";
import { totalClients } from "@/data/clients";

import { getTranslations } from "next-intl/server";

export default async function Clients({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; limit?: string | string[] }>;
}) {
  const t = await getTranslations("Admin.Clients");

  const { page, limit } = await searchParams;

  const rowsLimit = limit === "8" || limit === "12" || limit === "16" ? limit : "8";

  const clientsData = await totalClients(rowsLimit);

  console.log(limit);
  return (
    <div className="flex flex-col gap-4">
      <PageHeader labelText={"8 clients"} titleText={t("title")} buttonText={t("addingBtn")} />
      <CardsList description={clientsCardData} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <SearchBar placeholder={t("searchBar.placeholder")} />
        <Filters all="All" firstCategory="Newst" secondCategory="Oldest" />
      </div>
      <div className="flex flex-col gap-4">
        <ClientDataList data={clientsData} />
        <div className="grid grid-cols-3 grid-rows-1">
          <RowsPerPage rowsLimit={rowsLimit} />
          <ServerPagination page={page} />
        </div>
      </div>
    </div>
  );
}
