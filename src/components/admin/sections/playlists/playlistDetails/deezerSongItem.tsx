"use client";

import { Thumbnail } from "@/components/shared/thumbnail";
import { useAudioPlayerContext } from "@/hooks/useAudioPlayerContext";
import { PlayIcon, SquareIcon } from "lucide-react";
import type { DeezerSuggestion } from "./searchMethod";

type DeezerSuggestionItemProps = {
  suggestionDetails: DeezerSuggestion;
  addDeezerSuggestion: (suggestionDetails: DeezerSuggestion) => void;
};

export function DeezerSuggestionItem({
  suggestionDetails,
  addDeezerSuggestion,
}: DeezerSuggestionItemProps) {
  const iconSize = 15;

  const { togglePlay, playingId } = useAudioPlayerContext();

  return (
    <li className="hover:bg-accent-foreground/10 flex w-full flex-row gap-4 rounded-md px-3 py-2">
      <button
        onClick={() => addDeezerSuggestion(suggestionDetails)}
        className="flex w-full items-center justify-start gap-3 text-left"
      >
        <Thumbnail src={suggestionDetails.thumbnailURL} alt="Album thumbnail" />
        <div className="flex flex-col">
          <span className="text-gold-light font-semibold">{suggestionDetails.artist}</span>
          <span className="text-muted-foreground text-[13px]">{suggestionDetails.title}</span>
        </div>
      </button>
      <button
        className="bg-card flex size-9 shrink-0 items-center justify-center rounded-full border"
        aria-label={suggestionDetails.id === playingId ? "Stop preview" : "Play preview"}
        onClick={() => {
          togglePlay(suggestionDetails.preview, suggestionDetails.id);
        }}
      >
        {suggestionDetails.id === playingId ? (
          <SquareIcon size={iconSize} className="text-accent-foreground fill-current" />
        ) : (
          <PlayIcon size={iconSize} className="text-accent-foreground fill-current" />
        )}
      </button>
    </li>
  );
}
