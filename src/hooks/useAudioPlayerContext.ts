import { AudioPlayerContext } from "@/context/audioPlayerContext";
import { useContext } from "react";

export function useAudioPlayerContext() {
  const playerContext = useContext(AudioPlayerContext);
  if (!playerContext) throw new Error("Context is provided incorrectly");

  return playerContext;
}
