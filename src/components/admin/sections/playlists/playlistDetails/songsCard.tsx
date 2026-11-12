"use client";

import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { BanIcon, Music2Icon } from "lucide-react";
import { toast } from "@/components/ui/shadcn/toast";
import { SongsList } from "./songsList";
import { SongPicker } from "./songPicker";
import { createSongAction, deleteSongAction } from "@/actions/playlist";
import { SongMoment, SongType } from "../../../../../../generated";
import { startTransition, useOptimistic } from "react";
import { listSongReducer } from "@/lib/reducers";

export type songDataType = {
  artist: string | null;
  title: string;
  deezerId: string | null;
  thumbnailURL: string | null;
  youtubeURL: string | null;
};

export type songListItemType = {
  id: string;
  artist: string | null;
  title: string;
  type: SongType;
  moment: SongMoment | null;
  deezerId: string | null;
  thumbnailURL: string | null;
  youtubeURL: string | null;
};

type PlaylistType = {
  variant: SongType;
  title: string;
  fetchedSongs: songListItemType[];
  playlistId: string;
};

export function SongsCard({ variant, title, fetchedSongs, playlistId }: PlaylistType) {
  const [optimisticList, dispatch] = useOptimistic(fetchedSongs, listSongReducer);

  function deleteSong(id: string) {
    startTransition(async () => {
      dispatch({ type: "delete", data: { id } });
      const response = await deleteSongAction(id, playlistId);
      if (!response.success) {
        toast.add({ type: "error", title: "Song wasn't removed", description: response.message });
        return;
      }
      toast.add({ type: "success", title: "Song removed" });
    });
  }

  function addSong(songData: songDataType) {
    const fullData = {
      ...songData,
      type: variant,
      moment: null,
      playlistId: playlistId,
    };

    startTransition(async () => {
      dispatch({ type: "add", data: { id: crypto.randomUUID(), ...fullData } });
      const response = await createSongAction(fullData);
      if (!response.success) {
        toast.add({ type: "error", title: "Song wasn't added", description: response.message });
        return;
      }
      toast.add({ type: "success", title: "Song added" });
    });
  }

  return (
    <Card className="min-h-85 overflow-visible md:flex-1" size="md">
      <GeneralCardHeader
        title={title}
        icon={variant === SongType.MustPlay ? <Music2Icon /> : <BanIcon />}
        count={optimisticList.length}
      />
      <CardContent>
        <SongPicker addSong={addSong} />
      </CardContent>
      <CardFooter className="mx-(--card-spacing) border-t px-0">
        <SongsList songsList={optimisticList} onDeleteClick={deleteSong} />
      </CardFooter>
    </Card>
  );
}
