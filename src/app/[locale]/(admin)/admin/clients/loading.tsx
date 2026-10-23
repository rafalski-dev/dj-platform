import { SearchBar } from "@/components/admin/shared/searchBar";
import { CardsSkeleton } from "@/components/admin/skeletons/cardsSkeleton";
import { ClientsListSkeleton } from "@/components/admin/skeletons/clientsListSkeleton";
import { FiltersSkeleton } from "@/components/admin/skeletons/filtersSkeleton";
import { SectionHeaderSkeleton } from "@/components/admin/skeletons/sectionHeaderSkeleton";
import { PaginationSkeleton } from "@/components/admin/skeletons/paginationSkeleton";
import { RowsPerPageSkeleton } from "@/components/admin/skeletons/rowsPerPageSkeleton";
import { clientStatsKeys } from "@/constants/admin/cardStats";
import { filtersClientsData } from "@/constants/filtersOptions";
import { ROWS_PER_PAGE } from "@/lib/searchParams";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Admin.Clients");

  return (
    <div className="flex flex-col gap-4">
      <SectionHeaderSkeleton
        title={t("title")}
        action={{ btnLabel: t("addingBtn"), pathname: "/admin/clients/create" }}
      />
      <CardsSkeleton count={clientStatsKeys.length} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <SearchBar placeholder={t("searchBar.placeholder")} clearLabel={t("searchBar.clear")} />
        <FiltersSkeleton count={filtersClientsData.length} />
      </div>
      <div className="flex flex-col gap-4">
        <ClientsListSkeleton count={ROWS_PER_PAGE[0]} />
        <div className="flex justify-center md:grid md:grid-cols-3 md:grid-rows-1">
          <div className="hidden md:block">
            <RowsPerPageSkeleton />
          </div>
          <PaginationSkeleton />
        </div>
      </div>
    </div>
  );
}
