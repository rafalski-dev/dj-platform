import { AudioPlayer } from "@/components/admin/sections/playlists/playlistDetails/audioElement";
import { HighlightedMoments } from "@/components/admin/sections/playlists/playlistDetails/highlightedMoments";
import { PlaylistHeader } from "@/components/admin/sections/playlists/playlistDetails/playlistHeader";
import { SongsCard } from "@/components/admin/sections/playlists/playlistDetails/songsCard";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { Alert } from "@/components/ui/shadcn/alert";
import { getPlaylistDetails } from "@/data/playlists";
import { LockIcon, PencilLine } from "lucide-react";
import { adminCheck } from "@/lib/auth-helpers";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PlaylistStatus, SongType } from "../../../../../../../generated";

export default async function PlaylistDetails({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}) {
  const session = await adminCheck();
  const isAdmin = session.user.role === "Admin";
  const t = await getTranslations("Admin.Playlists.Details.songs");
  const { playlistId } = await params;
  const playlist = await getPlaylistDetails(playlistId);
  if (!playlist) notFound();
  const isLocked = playlist.status === PlaylistStatus.Locked;

  const mustPlaySongs = playlist.songs.filter((song) => song.type === SongType.MustPlay);
  const doNotPlaySongs = playlist.songs.filter((song) => song.type === SongType.DoNotPlay);
  const highlightedSongs = playlist.songs.filter(
    (song) => song.type === SongType.HighlightedMoment,
  );

  return (
    <>
      <Breadcrumbs dynamicLabel={playlist.event.name} />
      <PlaylistHeader fetchedData={playlist} isAdmin={isAdmin} />
      <AudioPlayer>
        <fieldset disabled={isLocked} className="flex flex-col gap-5">
          <Alert className="border-accent/30 bg-accent/5 text-accent-foreground rounded-xl px-4 py-3">
            {isLocked ? <LockIcon /> : <PencilLine />}
            {isLocked ? "Playlist is locked" : "Client can still edit playlist"}
          </Alert>
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
        </fieldset>
      </AudioPlayer>
    </>
  );
}
