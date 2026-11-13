import { PlaylistAutoPrint } from "@/components/admin/sections/playlists/playlistDetails/playlistPrint";
import { PlaylistPrintView } from "@/components/admin/sections/playlists/playlistPrint/playlistPrint";
import { getPlaylistDetails } from "@/data/playlists";
import { adminCheck } from "@/lib/auth-helpers";
import { notFound } from "next/navigation";

export default async function PlaylistPrint({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}) {
  await adminCheck();
  const { playlistId } = await params;
  const playlist = await getPlaylistDetails(playlistId);
  if (!playlist) notFound();

  return (
    <PlaylistAutoPrint playlistId={playlistId}>
      <PlaylistPrintView playlist={playlist} />
    </PlaylistAutoPrint>
  );
}
