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
import { SongMoment } from "../../../../../../../generated";

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

  const songs = [
    {
      id: "asdfa$435t3dadfa44f3fdd",
      artist: "Boys",
      title: "Jesteś Szalona (Official Video) 1997",
      moment: SongMoment.Welcoming,
      type: null,
      deezerId: null,
      thumbnailURL: "https://i.ytimg.com/vi/c2i4h7Q-8sA/mqdefault.jpg",
      youtubeURL: "https://www.youtube.com/watch?v=c2i4h7Q-8sA",
    },
    {
      id: "asdfa$432t3dadfa44f3fdd",
      artist: "SKOLIM",
      title: "Wyglądasz Idealnie (Official Video)",
      moment: SongMoment.FirstDance,
      type: null,
      deezerId: null,
      thumbnailURL: "https://i.ytimg.com/vi/-6KuSa0zgaA/mqdefault.jpg",
      youtubeURL: "https://www.youtube.com/watch?v=-6KuSa0zgaA",
    },
  ];

  return (
    <>
      <Breadcrumbs dynamicLabel={playlist.event.name} />
      <PlaylistHeader fetchedData={playlist} />
      <AudioPlayer>
        {playlist.event.type === "Wedding" && <HighlightedMoments songs={songs} />}
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
