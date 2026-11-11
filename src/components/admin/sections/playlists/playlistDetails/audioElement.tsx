"use client";

import { toast } from "@/components/ui/shadcn/toast";
import { AudioPlayerContext } from "@/context/audioPlayerContext";
import { useEffect, useRef, useState } from "react";

export function AudioPlayer({ children }: { children: React.ReactNode }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLMediaElement | null>(null);

  useEffect(() => {
    const player = (audioRef.current = new Audio());

    function clearId() {
      setPlayingId(null);
    }

    player.addEventListener("ended", clearId);

    return () => {
      player.removeEventListener("ended", clearId);
      player.pause();
    };
  }, []);

  function togglePlay(preview: string, id: string) {
    if (!audioRef.current) return;

    if (playingId !== id) {
      setPlayingId(id);
      audioRef.current.src = preview;
      audioRef.current.play().catch(() => {
        setPlayingId(null);
        toast.add({
          type: "error",
          title: "Preview unavailable",
          description: "Couldn't play this preview. Try again.",
        });
      });
    } else {
      audioRef.current.pause();
      setPlayingId(null);
    }
  }

  return (
    <AudioPlayerContext.Provider value={{ audioRef, togglePlay, playingId, setPlayingId }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
