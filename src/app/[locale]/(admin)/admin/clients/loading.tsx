import { SearchBar } from "@/components/dashboards/shared/searchBar";
import { CardsSkeleton } from "@/components/dashboards/skeletons/cardsSkeleton";
import { ClientsTableSkeleton } from "@/components/dashboards/skeletons/clientsTableSkeleton";
import { FiltersSkeleton } from "@/components/dashboards/skeletons/filtersSkeleton";
import { PageHeaderSkeleton } from "@/components/dashboards/skeletons/pageHeaderSkeleton";
import { PaginationSkeleton } from "@/components/dashboards/skeletons/paginationSkeleton";
import { RowsPerPageSkeleton } from "@/components/dashboards/skeletons/rowsPerPageSkeleton";
import { cardsData } from "@/constants/admin";
import { filtersClientsData } from "@/constants/filtersOptions";
import { ROWS_PER_PAGE } from "@/lib/searchParams";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Admin.Clients");

  return (
    <div className="flex flex-col gap-4">
      <PageHeaderSkeleton titleText={t("title")} buttonText={t("addingBtn")} />
      <CardsSkeleton count={cardsData.length} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <SearchBar placeholder={t("searchBar.placeholder")} clearLabel={t("searchBar.clear")} />
        <FiltersSkeleton count={filtersClientsData.length} />
      </div>
      <div className="flex flex-col gap-4">
        <ClientsTableSkeleton count={ROWS_PER_PAGE[0]} />
        <div className="grid grid-cols-3 grid-rows-1">
          <RowsPerPageSkeleton />
          <PaginationSkeleton />
        </div>
      </div>
    </div>
  );
}
