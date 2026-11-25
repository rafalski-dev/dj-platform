import { AudioPlayer } from "@/components/admin/sections/playlists/playlistDetails/audioElement";
import { HighlightedMoments } from "@/components/admin/sections/playlists/playlistDetails/highlightedMoments";
import { PlaylistHeader } from "@/components/admin/sections/playlists/playlistDetails/playlistHeader";
import { SongsCard } from "@/components/admin/sections/playlists/playlistDetails/songsCard";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { Alert } from "@/components/ui/shadcn/alert";
import { getClientPlaylist } from "@/data/playlists";
import { LockIcon, PencilLine } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PlaylistStatus, SongType } from "../../../../../../generated";

// The same editor as in the admin panel – the client adds and removes songs until the DJ locks it
export default async function DashboardPlaylists() {
  const [t, tSongs, playlist] = await Promise.all([
    getTranslations("Dashboard"),
    getTranslations("Admin.Playlists.Details.songs"),
    getClientPlaylist(),
  ]);
  // the nav item needs an event, so no playlist means someone else's or no event
  if (!playlist) notFound();

  const isLocked = playlist.status === PlaylistStatus.Locked;

  const mustPlaySongs = playlist.songs.filter((song) => song.type === SongType.MustPlay);
  const doNotPlaySongs = playlist.songs.filter((song) => song.type === SongType.DoNotPlay);
  const highlightedSongs = playlist.songs.filter(
    (song) => song.type === SongType.HighlightedMoment,
  );

  return (
    <>
      <SectionHeader title={t("Pages.playlists")} />
      <Alert className="border-accent/30 bg-accent/5 text-accent-foreground rounded-xl px-4 py-3">
        {isLocked ? <LockIcon /> : <PencilLine />}
        {t(isLocked ? "Playlist.locked" : "Playlist.open")}
      </Alert>
      <PlaylistHeader fetchedData={playlist} isAdmin={false} />
      <AudioPlayer>
        <fieldset disabled={isLocked} className="flex flex-col gap-5">
          {playlist.event.type === "Wedding" && (
            <HighlightedMoments songsList={highlightedSongs} playlistId={playlist.id} />
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <SongsCard
              variant={SongType.MustPlay}
              title={tSongs("mustPlay")}
              fetchedSongs={mustPlaySongs}
              playlistId={playlist.id}
            />
            <SongsCard
              variant={SongType.DoNotPlay}
              title={tSongs("doNotPlay")}
              fetchedSongs={doNotPlaySongs}
              playlistId={playlist.id}
            />
          </div>
        </fieldset>
      </AudioPlayer>
    </>
  );
}
