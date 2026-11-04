import { SearchBar } from "@/components/admin/shared/searchBar";
import { PaginationSkeleton } from "@/components/admin/skeletons/paginationSkeleton";
import { PlaylistsListSkeleton } from "@/components/admin/skeletons/playlistsListSkeleton";
import { RowsPerPageSkeleton } from "@/components/admin/skeletons/rowsPerPageSkeleton";
import { SectionHeaderSkeleton } from "@/components/admin/skeletons/sectionHeaderSkeleton";
import { ROWS_PER_PAGE } from "@/lib/searchParams";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Admin.Playlists");

  return (
    <div className="flex flex-col gap-4">
      <SectionHeaderSkeleton title={t("title")} />
      <SearchBar placeholder={t("searchBar.placeholder")} />
      <div className="flex flex-col gap-4">
        <PlaylistsListSkeleton count={ROWS_PER_PAGE[0]} />
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
