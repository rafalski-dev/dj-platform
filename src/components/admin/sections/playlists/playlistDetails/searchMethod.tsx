"use client";

import { EmptyState } from "@/components/admin/shared/emptyState";
import { PlaylistsDropdownSkeleton } from "@/components/admin/skeletons/playlistsDropdownSkeleton";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/shadcn/input-group";
import { useDebounce } from "@/hooks/useDebounce";
import { PenLineIcon, SearchAlertIcon, SearchIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";
import deezerLogo from "@/assets/logo/deezer.svg";
import { Field } from "@/components/ui/shadcn/field";
import { toast } from "@/components/ui/shadcn/toast";
import { DeezerSuggestionItem } from "./deezerSongItem";
import { songDataType } from "./songsCard";
import { useAudioPlayerContext } from "@/hooks/useAudioPlayerContext";

export function SearchMethod({ addSong }: { addSong: (songData: songDataType) => void }) {
  const popoverElement = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [suggestionsList, setSuggestionsList] = useState<DeezerSuggestion[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { audioRef, setPlayingId } = useAudioPlayerContext();

  // Fetching deezer suggestions
  useEffect(() => {
    if (debouncedValue.length < 3) return;

    async function getDeezerSuggestions(query: string) {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/deezer?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          const error = await response.json();
          setError(error.error);
          return;
        }
        const data = await response.json();
        setError("");
        setSuggestionsList(data);
      } catch (error) {
        console.error(error);
        setError("Something went wrong. Please try again");
      } finally {
        setIsLoading(false);
      }
    }

    getDeezerSuggestions(debouncedValue);
  }, [debouncedValue]);

  const clear = useCallback(() => {
    setIsOpen(false);
    audioRef.current?.pause();
    setPlayingId(null);
  }, [audioRef, setPlayingId]);

  // closing popover
  useEffect(() => {
    if (!isOpen) return;
    function closePopover(e: MouseEvent) {
      if (popoverElement.current && !popoverElement.current.contains(e.target as Node)) {
        clear();
      }
    }

    document.addEventListener("pointerdown", closePopover);

    return () => document.removeEventListener("pointerdown", closePopover);
  }, [clear, isOpen]);

  function addManualSong() {
    if (!searchValue.includes(" - ")) {
      toast.add({
        type: "error",
        title: "Song wasn't added",
        description: `Wrong song name convention. Please keep "artist - title" convention`,
      });
      return;
    }
    const songDetails = {
      artist: searchValue.split(" - ")[0].trim(),
      title: searchValue.split(" - ")[1].trim(),
    };
    addSong(songDetails);
    clear();
    setSearchValue("");
  }

  function addDeezerSuggestion(suggestionDetails: DeezerSuggestion) {
    const songData = {
      artist: suggestionDetails.artist,
      title: suggestionDetails.title,
      deezerId: suggestionDetails.id,
      thumbnailURL: suggestionDetails.thumbnailURL,
    };
    addSong(songData);
    clear();
    setSearchValue("");
  }

  return (
    <div className="relative w-full" ref={popoverElement}>
      <Field>
        <InputGroup>
          <InputGroupInput
            placeholder={'Search in convention "Artist - Title"'}
            value={searchValue}
            onChange={(e) => {
              setIsLoading(e.target.value !== debouncedValue);
              setIsOpen(e.target.value.length > 0);
              if (searchValue.length < 2) {
                setSuggestionsList([]);
              }
              setSearchValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addManualSong();
              }
              if (e.key === "Escape") {
                clear();
              }
            }}
            onFocus={() => {
              if (searchValue.length > 0) {
                setIsOpen(true);
              }
            }}
            onClick={() => {
              if (searchValue.length > 0) {
                setIsOpen(true);
              }
            }}
            autoComplete="off"
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          {searchValue.length !== 0 && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="Clear search"
                onClick={() => {
                  clear();
                  setSearchValue("");
                }}
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </Field>
      {isOpen && (
        <SuggestionsPopover
          searchValue={searchValue}
          isLoading={isLoading}
          suggestionsList={suggestionsList}
          addManualSong={addManualSong}
          addDeezerSuggestion={addDeezerSuggestion}
          clear={clear}
          error={error}
        />
      )}
    </div>
  );
}

export type DeezerSuggestion = {
  id: string;
  artist: string;
  title: string;
  preview: string;
  thumbnailURL: string;
};

type SuggestionsPopoverProps = {
  searchValue: string;
  isLoading: boolean;
  suggestionsList: DeezerSuggestion[];
  addManualSong: () => void;
  error: string;
};

function SuggestionsPopover({
  searchValue,
  isLoading,
  suggestionsList,
  addManualSong,
  error,
  ...rest
}: SuggestionsPopoverProps) {
  return (
    <div className="bg-background absolute top-13 z-10 w-full overflow-hidden rounded-md border">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1.5 px-5 pt-3 pb-3">
          <span className="text-popover-foreground text-xs">Suggested by</span>
          <Image src={deezerLogo} width={55} alt="Deezer Logo" />
        </div>
        {searchValue.length < 3 ? (
          <p className="text-muted-foreground px-5 pt-3 pb-6">
            Add <span className="">{3 - searchValue.length}</span> more character to start see song
            suggestions
          </p>
        ) : isLoading ? (
          <PlaylistsDropdownSkeleton />
        ) : error ? (
          <EmptyState title="Fetching" description={error} />
        ) : suggestionsList.length === 0 ? (
          <EmptyState
            icon={<SearchAlertIcon />}
            title="No suggestions"
            description={`There is no suggestions for "${searchValue}" search`}
            className="py-5"
          />
        ) : (
          <ul className="scroll-bar-edited flex max-h-70 w-full flex-col items-start overflow-y-scroll pb-2 pl-2">
            {suggestionsList.map((suggestion) => (
              <DeezerSuggestionItem key={suggestion.id} suggestionDetails={suggestion} {...rest} />
            ))}
          </ul>
        )}
      </div>
      <InsertManualButton searchValue={searchValue} addManualSong={addManualSong} />
    </div>
  );
}

type InsertManualButtonProps = {
  searchValue: string;
  addManualSong: () => void;
};

function InsertManualButton({ searchValue, addManualSong }: InsertManualButtonProps) {
  return (
    <div className="m-2 border-t pt-2">
      <button
        className="hover:bg-accent-foreground/7 flex w-full flex-row items-center gap-3 rounded-md px-3 py-2 duration-200"
        onClick={addManualSong}
      >
        <PenLineIcon className="border-border-strong text-accent-foreground size-10 rounded-md border p-2.5" />
        <div className="flex flex-col items-start">
          <span className="text-muted-foreground">
            Add search : <span className="text-foreground">{searchValue}</span>
          </span>
          <span className="text-popover-foreground text-xs">Please keep format artist - title</span>
        </div>
      </button>
    </div>
  );
}
