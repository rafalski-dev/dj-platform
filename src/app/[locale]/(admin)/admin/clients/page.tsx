import { ClientDataList } from "@/components/dashboard/clientDataList";
import { ClientsStatsCards } from "@/components/dashboard/clientsStatsCards";
import { Filters } from "@/components/dashboard/filters";
import { Pagination } from "@/components/dashboard/pagination";
import { RowsPerPage } from "@/components/dashboard/RowsPerPage";
import { SearchBar } from "@/components/dashboard/searchBar";
import { PageHeader } from "@/components/dashboard/shared/pageHeader";
import { CardsSkeleton } from "@/components/dashboard/skeletons/cardsSkeleton";
import { cardsData } from "@/constants/admin";
import { filtersClientsData } from "@/constants/filtersOptions";
import { getCountClients, getPaginationedClients } from "@/data/clients";
import {
  getFormattedFilter,
  getFormattedLimit,
  getFormattedPage,
  getFormattedQuery,
  PersistedParams,
} from "@/lib/searchParams";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function Clients({
  searchParams,
}: {
  searchParams: Promise<{
    limit?: string | string[];
    page?: string | string[];
    query?: string | string[];
    filter?: string | string[];
  }>;
}) {
  const t = await getTranslations("Admin.Clients");

  const { limit, page, query, filter } = await searchParams;
  const formattedLimit = getFormattedLimit(limit);
  const formattedPage = getFormattedPage(page);
  const formattedQuery = getFormattedQuery(query);
  const formattedFilter = getFormattedFilter(filter);

  const totalClients = await getCountClients(formattedQuery, formattedFilter);
  const totalPages = totalClients === 0 ? 1 : Math.ceil(totalClients / formattedLimit);
  const currentPage = formattedPage > totalPages ? totalPages : formattedPage;

  const persistedParams: PersistedParams = {
    page: currentPage,
    limit: formattedLimit,
    query: formattedQuery,
    filter: formattedFilter,
  };

  const paginationedData = await getPaginationedClients(
    formattedLimit,
    currentPage,
    formattedQuery,
    formattedFilter,
  );

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        labelText={t("count", { count: totalClients })}
        titleText={t("title")}
        buttonText={t("addingBtn")}
      />

      <Suspense fallback={<CardsSkeleton count={cardsData.length} />}>
        <ClientsStatsCards />
      </Suspense>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <SearchBar placeholder={t("searchBar.placeholder")} clearLabel={t("searchBar.clear")} />
        <Filters
          t={t}
          pathname="/admin/clients"
          filters={filtersClientsData}
          persistedParams={persistedParams}
        />
      </div>
      <div className="flex flex-col gap-4">
        <ClientDataList data={paginationedData} persistedParams={persistedParams} />
        {totalClients > 0 && (
          <div className="grid grid-cols-3 grid-rows-1">
            <RowsPerPage persistedParams={persistedParams} pathname="/admin/clients" />
            <Pagination
              persistedParams={persistedParams}
              totalPages={totalPages}
              pathname="/admin/clients"
            />
          </div>
        )}
      </div>
    </div>
  );
}
