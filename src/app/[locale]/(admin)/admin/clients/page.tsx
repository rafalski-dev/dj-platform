import { ClientsStatsCards } from "@/components/admin/sections/clients/clientList/clientsStatsCards";
import { Filters } from "@/components/admin/shared/filters";
import { RowsPerPage } from "@/components/admin/shared/rowsPerPage";
import { SearchBar } from "@/components/admin/shared/searchBar";
import { PageHeader } from "@/components/admin/shared/pageHeader";
import { CardsSkeleton } from "@/components/admin/skeletons/cardsSkeleton";
import { ClientsListSkeleton } from "@/components/admin/skeletons/clientsListSkeleton";
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
import { Pagination } from "@/components/admin/shared/pagination";
import { ClientsList } from "@/components/admin/sections/clients/clientList/clientsList";

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
    <>
      <PageHeader
        label={t("count", { count: totalClients })}
        title={t("title")}
        action={{ btnLabel: t("addingBtn"), pathname: "/admin/clients/create" }}
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
          fallback={<ClientsListSkeleton count={formattedLimit} />}
        >
          <ClientsList persistedParams={persistedParams} />
        </Suspense>

        {totalClients > 0 && (
          <div className="flex flex-row justify-between px-4 md:px-0">
            <RowsPerPage persistedParams={persistedParams} pathname="/admin/clients" />
            <Pagination
              persistedParams={persistedParams}
              totalPages={totalPages}
              pathname="/admin/clients"
            />
          </div>
        )}
      </div>
    </>
  );
}
