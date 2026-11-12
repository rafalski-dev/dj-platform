"use client";

import { ConfirmAddingSkeleton } from "@/components/admin/skeletons/confirmAddingSkeleton";
import { ThumbnailVideo } from "@/components/shared/thumbnail";
import { Button } from "@/components/ui/shadcn/button";
import { Field, FieldError } from "@/components/ui/shadcn/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/shadcn/input-group";
import { useDebounce } from "@/hooks/useDebounce";

import { ClipboardIcon, Link2Icon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { songDataType } from "./songsCard";

export function UrlMethod({ addSong }: { addSong: (songData: songDataType) => void }) {
  const [urlValue, setUrlValue] = useState("");
  const debouncedValue = useDebounce(urlValue, 500);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [URLsongDetails, setURLSongDetails] = useState<YoutubeSongDetails | null>(null);

  useEffect(() => {
    async function getYoutubeLinkData(url: string) {
      if (url === "") return setError("");
      if (!url.includes("youtu")) return setError("Please enter a valid YouTube URL.");

      setIsLoading(true);
      try {
        const response = await fetch(`/api/oembed?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
          const error = await response.json();
          return setError(error.error);
        }

        const data = await response.json();
        setURLSongDetails(data);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    getYoutubeLinkData(debouncedValue);
  }, [debouncedValue]);

  function clear() {
    setURLSongDetails(null);
    setUrlValue("");
  }

  if (isLoading) return <ConfirmAddingSkeleton />;

  return (
    <>
      {URLsongDetails ? (
        <ConfirmAdding URLsongDetails={URLsongDetails} clear={clear} addSong={addSong} />
      ) : (
        <Field>
          <InputGroup>
            <InputGroupInput
              value={urlValue}
              aria-invalid={!!error}

              placeholder="Paste YouTube URL"
              onChange={(e) => {
                setError("");
                setUrlValue(e.target.value);
              }}
              className="truncate"
              autoComplete="off"
            />
            <InputGroupAddon align="inline-start">
              <Link2Icon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              {urlValue ? (
                <InputGroupButton
                  key="clear"
                  size="icon-xs"
                  aria-label="Clear link"
                  onClick={() => {
                    setUrlValue("");
                    setError("");
                  }}
                >
                  <XIcon />
                </InputGroupButton>
              ) : (
                <InputGroupButton
                  key="paste"
                  size="xs"
                  onClick={async () => {
                    try {
                      const readText = await navigator.clipboard.readText();
                      setUrlValue(readText);
                      setError("");
                    } catch {
                      setError("Clipboard access denied. Paste the link manually.");
                    }
                  }}
                >
                  <ClipboardIcon />
                  Paste
                </InputGroupButton>
              )}
            </InputGroupAddon>
          </InputGroup>
          {error && <FieldError>{error}</FieldError>}
        </Field>
      )}
    </>
  );
}

export type YoutubeSongDetails = {
  artist: string | null;
  title: string;
  youtubeURL: string;
  thumbnailURL: string;
};

type ConfirmAddingProps = {
  URLsongDetails: YoutubeSongDetails;
  clear: () => void;
  addSong: (songData: songDataType) => void;
};

export function ConfirmAdding({ URLsongDetails, clear, addSong }: ConfirmAddingProps) {
  return (
    <div className="flex flex-col gap-4">
      <p>Is this your song?</p>
      <div className="bg-accent-foreground/8 flex flex-row items-center justify-between gap-3 rounded-md px-3 py-2">
        <div className="flex flex-row items-center gap-4">
          <a href={URLsongDetails.youtubeURL} target="_blank" rel="noopener noreferrer">
            <ThumbnailVideo src={URLsongDetails.thumbnailURL} alt={"Video thumbnail"} />
          </a>
          <div className="flex flex-col">
            <span className="text-gold-light text-base font-medium tracking-wide">
              {URLsongDetails.artist ?? "Unknown artist"}
            </span>
            <span className="text-muted-foreground text-[13px]">{URLsongDetails.title}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <Button
          className="flex-1"
          size="sm"
          onClick={() => {
            const songData = {
              artist: URLsongDetails.artist,
              title: URLsongDetails.title,
              youtubeURL: URLsongDetails.youtubeURL,
              thumbnailURL: URLsongDetails.thumbnailURL,
              deezerId: null,
            };
            addSong(songData);
            clear();
          }}
        >
          Add
        </Button>
        <Button onClick={clear} variant="outline" size="sm" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}
