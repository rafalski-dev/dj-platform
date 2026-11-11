import { AudioPlayer } from "@/components/admin/sections/playlists/playlistDetails/audioElement";
import { HighlightedMoments } from "@/components/admin/sections/playlists/playlistDetails/highlightedMoments";
import { PlaylistHeader } from "@/components/admin/sections/playlists/playlistDetails/playlistHeader";
import { SongsCard } from "@/components/admin/sections/playlists/playlistDetails/songsCard";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { initialDoNotPlaySongs, initialMustPlaySongs } from "@/constants/test";
import { getPlaylistDetails } from "@/data/playlists";
import { adminCheck } from "@/lib/auth-helpers";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function PlaylistDetails({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}) {
  await adminCheck();
  const t = await getTranslations("Admin.Playlists.Details.songs");
  const { playlistId } = await params;
  const playlist = await getPlaylistDetails(playlistId);
  if (!playlist) notFound();

  return (
    <>
      <Breadcrumbs dynamicLabel={playlist.event.name} />
      <PlaylistHeader fetchedData={playlist} />
      <AudioPlayer>
        {playlist.event.type === "Wedding" && <HighlightedMoments />}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SongsCard variant="mustPlay" title={t("mustPlay")} fetchedSongs={initialMustPlaySongs} />
          <SongsCard
            variant="doNotPlay"
            title={t("doNotPlay")}
            fetchedSongs={initialDoNotPlaySongs}
          />
        </div>
      </AudioPlayer>
    </>
  );
}
