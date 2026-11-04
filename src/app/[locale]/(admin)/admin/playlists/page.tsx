import { PlaylistsList } from "@/components/admin/sections/playlists/playlistsList/playlistsList";
import { Pagination } from "@/components/admin/shared/pagination";
import { RowsPerPage } from "@/components/admin/shared/rowsPerPage";
import { SearchBar } from "@/components/admin/shared/searchBar";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { PlaylistsListSkeleton } from "@/components/admin/skeletons/playlistsListSkeleton";
import { getCountPlaylists } from "@/data/playlists";
import {
  getFormattedLimit,
  getFormattedPage,
  getFormattedQuery,
  PersistedParams,
  ROWS_PER_PAGE,
} from "@/lib/searchParams";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function Playlists({
  searchParams,
}: {
  searchParams: Promise<{
    limit?: string | string[];
    page?: string | string[];
    query?: string | string[];
  }>;
}) {
  const t = await getTranslations("Admin.Playlists");

  const { limit, page, query } = await searchParams;
  const formattedLimit = getFormattedLimit(limit);
  const formattedPage = getFormattedPage(page);
  const formattedQuery = getFormattedQuery(query);

  const countPlaylists = await getCountPlaylists(formattedQuery);
  const totalPages = countPlaylists === 0 ? 1 : Math.ceil(countPlaylists / formattedLimit);
  const currentPage = formattedPage > totalPages ? totalPages : formattedPage;

  const persistedParams: PersistedParams = {
    page: currentPage,
    limit: formattedLimit,
    query: formattedQuery,
  };

  return (
    <>
      <SectionHeader title={t("title")} label={t("count", { count: countPlaylists })} />
      <SearchBar placeholder={t("searchBar.placeholder")} />
      <div className="flex flex-col gap-4">
        <Suspense
          key={`${currentPage}-${formattedLimit}-${formattedQuery}`}
          fallback={<PlaylistsListSkeleton count={formattedLimit} />}
        >
          <PlaylistsList persistedParams={persistedParams} />
        </Suspense>

        {countPlaylists > 0 && (
          <div className="flex flex-row justify-between px-4 md:px-0">
            <RowsPerPage
              limitsOption={ROWS_PER_PAGE}
              persistedParams={persistedParams}
              pathname="/admin/playlists"
            />
            <Pagination
              persistedParams={persistedParams}
              totalPages={totalPages}
              pathname="/admin/playlists"
            />
          </div>
        )}
      </div>
    </>
  );
}
