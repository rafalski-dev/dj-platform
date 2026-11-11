import { createContext, Dispatch, RefObject, SetStateAction } from "react";

export type AudioPlayerContextType = {
  audioRef: RefObject<HTMLMediaElement | null>;
  togglePlay: (preview: string, id: string) => void;
  playingId: string | null;
  setPlayingId: Dispatch<SetStateAction<string | null>>;
};

export const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);
