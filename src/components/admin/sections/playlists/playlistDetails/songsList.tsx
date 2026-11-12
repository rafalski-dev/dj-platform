import { EmptyState } from "@/components/admin/shared/emptyState";
import { songListItemType } from "./songsCard";
import { SongsListItem } from "./songsListItem";

type SongsListProps = {
  songsList: songListItemType[];
  onDeleteClick: (arg: string) => void;
};

export function SongsList({ songsList, onDeleteClick }: SongsListProps) {
  if (songsList.length === 0)
    return (
      <EmptyState
        title="No songs yet"
        description="Add your first song to see the list"
        className="pt-8 pb-2"
      />
    );

  return (
    <ul className="scroll-bar-edited flex max-h-65 w-full flex-col overflow-y-scroll pr-2">
      {songsList.map((song) => {
        return (
          <li key={song.id} className="border-b py-1 last:border-0">
            <SongsListItem songDetails={song} onDeleteClick={onDeleteClick} />
          </li>
        );
      })}
    </ul>
  );
}
