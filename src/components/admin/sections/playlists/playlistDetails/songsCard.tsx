"use client";

import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { BanIcon, Music2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/shadcn/toast";
import { SongsList } from "./songsList";
import { SongPicker } from "./songPicker";

export type songDataType = {
  artist: string | null;
  title: string;
  deezerId?: string | null;
  thumbnailURL?: string | null;
  youtubeURL?: string | null;
};

export type songListItemType = {
  id: string;
  artist: string | null;
  title: string;
  type: string;
  moment: string | null;
  deezerId: string | null;
  thumbnailURL: string | null;
  youtubeURL: string | null;
};

type PlaylistType = {
  variant: "mustPlay" | "doNotPlay";
  title: string;
  fetchedSongs: songListItemType[];
};

export function SongsCard({ variant, title, fetchedSongs }: PlaylistType) {
  const [songsList, setSongsList] = useState<songListItemType[]>(fetchedSongs);

  function deleteSong(id: string) {
    setSongsList((prev) => prev.filter((el) => el.id !== id));
    toast.add({ type: "success", title: "Song removed" });
  }

  function addSong(songData: songDataType) {
    const { artist, title, deezerId, thumbnailURL, youtubeURL } = songData;

    setSongsList((prev) => [
      {
        id: crypto.randomUUID(),
        artist,
        title,
        type: variant,
        moment: null,
        deezerId: deezerId ?? null,
        thumbnailURL: thumbnailURL ?? null,
        youtubeURL: youtubeURL ?? null,
      },
      ...prev,
    ]);

    toast.add({ type: "success", title: "Song added" });
  }

  return (
    <Card className="min-h-85 overflow-visible md:flex-1" size="md">
      <GeneralCardHeader
        title={title}
        icon={variant === "mustPlay" ? <Music2Icon /> : <BanIcon />}
        count={songsList.length}
      />
      <CardContent>
        <SongPicker addSong={addSong} />
      </CardContent>
      <CardFooter className="mx-(--card-spacing) border-t px-0">
        <SongsList songsList={songsList} onDeleteClick={deleteSong} />
      </CardFooter>
    </Card>
  );
}
