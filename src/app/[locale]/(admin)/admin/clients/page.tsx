import { ClientDataList } from "@/components/dashboard/clientDataList";
import { ClientsStatsCards } from "@/components/dashboard/clientsStatsCards";
import { Filters } from "@/components/dashboard/filters";
import { Pagination } from "@/components/dashboard/pagination";
import { RowsPerPage } from "@/components/dashboard/RowsPerPage";
import { SearchBar } from "@/components/dashboard/searchBar";
import { PageHeader } from "@/components/dashboard/shared/pageHeader";
import { getCountClients, getPaginationedClients } from "@/data/clients";
import { getValidPage } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function Clients({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string | string[];
    limit?: string | string[];
    query?: string | string[];
  }>;
}) {
  const t = await getTranslations("Admin.Clients");
  const { query, page, limit } = await searchParams;

  const formattedQuery = typeof query === "string" ? query.trim() : undefined;
  const totalClients = await getCountClients(formattedQuery);

  const formattedLimit = limit === "8" || limit === "12" || limit === "16" ? Number(limit) : 8;
  const totalPages = totalClients === 0 ? 1 : Math.ceil(totalClients / formattedLimit);
  const formattedPage = getValidPage(page, totalPages);

  const paginationedData = await getPaginationedClients(
    formattedLimit,
    formattedPage,
    formattedQuery,
  );

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        labelText={`${totalClients} clients`}
        titleText={t("title")}
        buttonText={t("addingBtn")}
      />
      <ClientsStatsCards />
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <SearchBar placeholder={t("searchBar.placeholder")} />
        <Filters all="All" firstCategory="Newst" secondCategory="Oldest" />
      </div>
      <div className="flex flex-col gap-4">
        <ClientDataList
          data={paginationedData}
          totalClients={totalClients}
          query={formattedQuery}
        />
        {totalClients > 0 && (
          <div className="grid grid-cols-3 grid-rows-1">
            <RowsPerPage rowsLimit={formattedLimit} query={formattedQuery} />
            <Pagination
              page={formattedPage}
              totalPages={totalPages}
              rowsLimit={formattedLimit}
              query={formattedQuery}
            />
          </div>
        )}
      </div>
    </div>
  );
}
