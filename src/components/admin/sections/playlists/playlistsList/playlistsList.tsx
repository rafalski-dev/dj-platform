import { getPaginatedPlaylists } from "@/data/playlists";
import { PersistedParams } from "@/lib/searchParams";
import { PlaylistsTable } from "./playlistsTable";
import { PlaylistsCards } from "./playlistsCards";
import { EmptyState } from "@/components/admin/shared/emptyState";
import { ListMusicIcon, PlusIcon, SearchXIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function PlaylistsList({ persistedParams }: { persistedParams: PersistedParams }) {
  const t = await getTranslations("Admin.Playlists");

  const playlists = await getPaginatedPlaylists(
    persistedParams.limit,
    persistedParams.page,
    persistedParams.query,
  );

  const noPlaylists = (
    <EmptyState
      icon={<ListMusicIcon strokeWidth={1.5} />}
      title={t("empty.noPlaylists.title")}
      description={t("empty.noPlaylists.description")}
      action={{
        label: t("empty.noPlaylists.action"),
        href: "/admin/events/create",
        icon: <PlusIcon className="size-3" strokeWidth={3} />,
      }}
    />
  );

  const noResults = (
    <EmptyState
      icon={<SearchXIcon strokeWidth={1.5} />}
      title={t("empty.noResults.title")}
      description={t("empty.noResults.descriptionQuery", { query: persistedParams.query ?? "" })}
      action={{ label: t("empty.noResults.action"), href: "/admin/playlists" }}
    />
  );

  const selectEmptyState = persistedParams.query ? noResults : noPlaylists;

  return (
    <>
      <PlaylistsTable playlists={playlists} selectEmptyState={selectEmptyState} />
      <PlaylistsCards playlists={playlists} selectEmptyState={selectEmptyState} />
    </>
  );
}
