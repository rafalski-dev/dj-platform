import { songListItemType } from "@/components/admin/sections/playlists/playlistDetails/songsCard";

type ListSongAction =
  { type: "add"; data: songListItemType } | { type: "delete"; data: { id: string } };

export function listSongReducer(currentList: songListItemType[], action: ListSongAction) {
  switch (action.type) {
    case "add":
      return [action.data, ...currentList];
    case "delete":
      return currentList.filter((el) => el.id !== action.data.id);
    default:
      return currentList;
  }
}
