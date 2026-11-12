"use client";

import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { CakeIcon, HandHeartIcon, HeartIcon, PartyPopperIcon, TrashIcon } from "lucide-react";
import { SongMoment } from "../../../../../../generated";
import { SongPicker } from "./songPicker";
import { SongsListItem } from "./songsListItem";
import { useState } from "react";
import { songDataType } from "./songsCard";
import { toast } from "@/components/ui/shadcn/toast";

const highlightedMoments = [
  { title: "Welcoming couple", moment: SongMoment.Welcoming, icon: <PartyPopperIcon /> },
  { title: "First dance", moment: SongMoment.FirstDance, icon: <HeartIcon /> },
  { title: "Cake presentation", moment: SongMoment.CakePresentation, icon: <CakeIcon /> },
  { title: "Dedication to parents", moment: SongMoment.ParentsDedication, icon: <HandHeartIcon /> },
];

export function HighlightedMoments({ songs }) {
  const [songsList, setSongsList] = useState(songs);

  function deleteSong(id) {
    setSongsList((prev) => prev.filter((el) => el.id !== id));
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {highlightedMoments.map(({ title, icon, moment }) => {
        const song = songsList.find((el) => el.moment === moment);

        function addSong(songData) {
          const { artist, title, deezerId, thumbnailURL, youtubeURL } = songData;

          setSongsList((prev) => [
            {
              id: crypto.randomUUID(),
              artist,
              title,
              type: null,
              moment: moment,
              deezerId: deezerId ?? null,
              thumbnailURL: thumbnailURL ?? null,
              youtubeURL: youtubeURL ?? null,
            },
            ...prev,
          ]);

          toast.add({ type: "success", title: "Song added" });
        }

        return (
          <Card key={title} className="overflow-visible">
            <GeneralCardHeader
              title={title}
              icon={icon}
              action={
                song && {
                  onActionBtnClick: () => deleteSong(song.id),
                  btnLabel: "Remove",
                  btnIcon: <TrashIcon />,
                }
              }
            />
            <CardContent>
              {song ? (
                <SongsListItem songDetails={song} variant="highlighted" />
              ) : (
                <SongPicker addSong={addSong} />
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
