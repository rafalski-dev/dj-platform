import { CardsList } from "@/components/dashboard/cardsList";
import { ClientDataList } from "@/components/dashboard/clientDataList";
import { Filters } from "@/components/dashboard/filters";
import { Pagination } from "@/components/dashboard/pagination";
import { RowsPerPage } from "@/components/dashboard/RowsPerPage";
import { SearchBar } from "@/components/dashboard/searchBar";
import { PageHeader } from "@/components/dashboard/shared/pageHeader";
import { clientsCardData } from "@/constants/dashboard";
import { getCountClients, getPaginationedClients } from "@/data/clients";
import { getValidPage } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function Clients({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; limit?: string | string[] }>;
}) {
  const t = await getTranslations("Admin.Clients");

  const totalClients = await getCountClients();

  const { page, limit } = await searchParams;

  const rowsLimit = limit === "8" || limit === "12" || limit === "16" ? Number(limit) : 8;
  const totalPages = totalClients === 0 ? 1 : Math.ceil(totalClients / rowsLimit);
  const formattedPage = getValidPage(page, totalPages);

  const paginationedData = await getPaginationedClients(rowsLimit, formattedPage);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader labelText={"8 clients"} titleText={t("title")} buttonText={t("addingBtn")} />
      <CardsList description={clientsCardData} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <SearchBar placeholder={t("searchBar.placeholder")} />
        <Filters all="All" firstCategory="Newst" secondCategory="Oldest" />
      </div>
      <div className="flex flex-col gap-4">
        <ClientDataList data={paginationedData} />
        <div className="grid grid-cols-3 grid-rows-1">
          <RowsPerPage rowsLimit={rowsLimit} />
          <Pagination page={formattedPage} totalPages={totalPages} rowsLimit={rowsLimit} />
        </div>
      </div>
    </div>
  );
}
