import { AudioPlayer } from "@/components/admin/sections/playlists/playlistDetails/audioElement";
import { HighlightedMoments } from "@/components/admin/sections/playlists/playlistDetails/highlightedMoments";
import { PlaylistHeader } from "@/components/admin/sections/playlists/playlistDetails/playlistHeader";
import { SongsCard } from "@/components/admin/sections/playlists/playlistDetails/songsCard";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { getPlaylistDetails } from "@/data/playlists";
import { adminCheck } from "@/lib/auth-helpers";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SongType } from "../../../../../../../generated";

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

  const mustPlaySongs = playlist.songs.filter((song) => song.type === SongType.MustPlay);
  const doNotPlaySongs = playlist.songs.filter((song) => song.type === SongType.DoNotPlay);
  const highlightedSongs = playlist.songs.filter(
    (song) => song.type === SongType.HighlightedMoment,
  );

  return (
    <>
      <Breadcrumbs dynamicLabel={playlist.event.name} />
      <PlaylistHeader fetchedData={playlist} />
      <AudioPlayer>
        {playlist.event.type === "Wedding" && (
          <HighlightedMoments songsList={highlightedSongs} playlistId={playlistId} />
        )}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SongsCard
            variant={SongType.MustPlay}
            title={t("mustPlay")}
            fetchedSongs={mustPlaySongs}
            playlistId={playlistId}
          />
          <SongsCard
            variant={SongType.DoNotPlay}
            title={t("doNotPlay")}
            fetchedSongs={doNotPlaySongs}
            playlistId={playlistId}
          />
        </div>
      </AudioPlayer>
    </>
  );
}
