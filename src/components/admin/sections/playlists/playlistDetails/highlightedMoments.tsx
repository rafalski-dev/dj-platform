"use client";

import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { CakeIcon, HandHeartIcon, HeartIcon, PartyPopperIcon, TrashIcon } from "lucide-react";
import { SongMoment, SongType } from "../../../../../../generated";
import { SongPicker } from "./songPicker";
import { SongsListItem } from "./songsListItem";
import { toast } from "@/components/ui/shadcn/toast";
import { createSongAction, deleteSongAction } from "@/actions/playlist";
import { songDataType, songListItemType } from "./songsCard";
import { startTransition, useOptimistic } from "react";
import { listSongReducer } from "@/lib/reducers";

const highlightedMoments = [
  { title: "Welcoming the couple", moment: SongMoment.Welcoming, icon: <PartyPopperIcon /> },
  { title: "First dance", moment: SongMoment.FirstDance, icon: <HeartIcon /> },
  { title: "Cake presentation", moment: SongMoment.CakePresentation, icon: <CakeIcon /> },
  { title: "Dedication to parents", moment: SongMoment.ParentsDedication, icon: <HandHeartIcon /> },
];

type HighlightedMomentsProps = {
  songsList: songListItemType[];
  playlistId: string;
};

export function HighlightedMoments({ songsList, playlistId }: HighlightedMomentsProps) {
  const [optimisticList, dispatch] = useOptimistic(songsList, listSongReducer);

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

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {highlightedMoments.map(({ title, icon, moment }) => {
        const song = optimisticList.find((el) => el.moment === moment);

        function addSong(songData: songDataType) {
          const fullData = {
            ...songData,
            type: SongType.HighlightedMoment,
            moment: moment,
            playlistId: playlistId,
          };

          startTransition(async () => {
            dispatch({ type: "add", data: { id: crypto.randomUUID(), ...fullData } });

            const response = await createSongAction(fullData);
            if (!response.success) {
              toast.add({
                type: "error",
                title: "Song wasn't added",
                description: response.message,
              });
              return;
            }
            toast.add({ type: "success", title: "Song added" });
          });
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
