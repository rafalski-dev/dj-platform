import { ClientsTable } from "@/components/dashboards/admin/clients/clientsTable";
import { ClientsStatsCards } from "@/components/dashboards/admin/clients/clientsStatsCards";
import { Filters } from "@/components/dashboards/shared/filters";
import { RowsPerPage } from "@/components/dashboards/shared/RowsPerPage";
import { SearchBar } from "@/components/dashboards/shared/searchBar";
import { PageHeader } from "@/components/dashboards/shared/pageHeader";
import { CardsSkeleton } from "@/components/dashboards/skeletons/cardsSkeleton";
import { ClientsTableSkeleton } from "@/components/dashboards/skeletons/clientsTableSkeleton";
import { cardsData } from "@/constants/admin";
import { filtersClientsData } from "@/constants/filtersOptions";
import { getCountClients } from "@/data/clients";
import {
  getFormattedFilter,
  getFormattedLimit,
  getFormattedPage,
  getFormattedQuery,
  PersistedParams,
} from "@/lib/searchParams";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Pagination } from "@/components/dashboards/shared/pagination";

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
        <Suspense
          key={`${currentPage}-${formattedLimit}-${formattedQuery}-${formattedFilter}`}
          fallback={<ClientsTableSkeleton count={formattedLimit} />}
        >
          <ClientsTable persistedParams={persistedParams} />
        </Suspense>

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
