import { EmptyState } from "@/components/admin/shared/emptyState";
import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, XIcon } from "lucide-react";

import { Thumbnail, ThumbnailFallback } from "@/components/shared/thumbnail";
import { songListItemType } from "./songsCard";

type SongsListProps = {
  songsList: songListItemType[];
  onDeleteClick: (arg: string) => void;
};

export function SongsList({ songsList, onDeleteClick }: SongsListProps) {
  if (songsList.length === 0)
    return (
      <EmptyState
        title="No songs yet"
        description="Add your first song to see list"
        className="pt-8 pb-2"
      />
    );

  return (
    <ul className="scroll-bar-edited flex max-h-65 w-full flex-col overflow-y-scroll pr-2">
      {songsList.map(({ id, artist, title, thumbnailURL, deezerId, youtubeURL }) => {
        const sourceLink = deezerId
          ? { href: `https://www.deezer.com/track/${deezerId}`, label: "Open on Deezer" }
          : youtubeURL
            ? { href: youtubeURL, label: "Watch on YouTube" }
            : null;

        return (
          <li key={id} className="border-b py-1 last:border-0">
            <div className="hover:bg-accent-foreground/5 flex items-center justify-between gap-3 rounded-md px-2 py-2 transition-colors">
              <div className="flex min-w-0 items-center gap-3">
                {thumbnailURL ? (
                  <Thumbnail src={thumbnailURL} alt="Album thumbnail " />
                ) : (
                  <ThumbnailFallback text={artist ?? title} />
                )}

                <div className="flex min-w-0 flex-col">
                  <span className="text-gold-light truncate font-semibold">{artist ?? "-"}</span>
                  <span className="text-muted-foreground truncate text-[13px]">{title ?? "-"}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {sourceLink && (
                  <a
                    href={sourceLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sourceLink.label}
                    title={sourceLink.label}
                    className={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-9")}
                  >
                    <ExternalLinkIcon className="text-accent-foreground size-4" />
                  </a>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9"
                  aria-label="Remove song"
                  onClick={() => onDeleteClick(id)}
                >
                  <XIcon className="text-accent-foreground size-4" />
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
