import { ContractsList } from "@/components/admin/sections/contracts/contractsList/contractsList";
import { Pagination } from "@/components/admin/shared/pagination";
import { RowsPerPage } from "@/components/admin/shared/rowsPerPage";
import { SearchBar } from "@/components/admin/shared/searchBar";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { PlaylistsListSkeleton } from "@/components/admin/skeletons/playlistsListSkeleton";
import { getCountContracts } from "@/data/contracts";
import {
  getFormattedLimit,
  getFormattedPage,
  getFormattedQuery,
  PersistedParams,
  ROWS_PER_PAGE,
} from "@/lib/searchParams";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function Contracts({
  searchParams,
}: {
  searchParams: Promise<{
    limit?: string | string[];
    page?: string | string[];
    query?: string | string[];
  }>;
}) {
  const t = await getTranslations("Admin.Contracts");

  const { limit, page, query } = await searchParams;
  const formattedLimit = getFormattedLimit(limit);
  const formattedPage = getFormattedPage(page);
  const formattedQuery = getFormattedQuery(query);

  const countContracts = await getCountContracts(formattedQuery);
  const totalPages = countContracts === 0 ? 1 : Math.ceil(countContracts / formattedLimit);
  const currentPage = formattedPage > totalPages ? totalPages : formattedPage;

  const persistedParams: PersistedParams = {
    page: currentPage,
    limit: formattedLimit,
    query: formattedQuery,
  };

  return (
    <>
      <SectionHeader
        title={t("title")}
        label={t("count", { count: countContracts })}
        action={{ btnLabel: t("addingBtn"), pathname: "/admin/contracts/create" }}
      />
      <SearchBar placeholder={t("searchBar.placeholder")} />
      <div className="flex flex-col gap-4">
        <Suspense
          key={`${currentPage}-${formattedLimit}-${formattedQuery}`}
          fallback={<PlaylistsListSkeleton count={formattedLimit} />}
        >
          <ContractsList persistedParams={persistedParams} />
        </Suspense>

        {countContracts > 0 && (
          <div className="flex flex-row justify-between px-4 md:px-0">
            <RowsPerPage
              limitsOption={ROWS_PER_PAGE}
              persistedParams={persistedParams}
              pathname="/admin/contracts"
            />
            <Pagination
              persistedParams={persistedParams}
              totalPages={totalPages}
              pathname="/admin/contracts"
            />
          </div>
        )}
      </div>
    </>
  );
}
