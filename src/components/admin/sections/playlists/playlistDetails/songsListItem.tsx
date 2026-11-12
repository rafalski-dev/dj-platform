import { Thumbnail, ThumbnailFallback } from "@/components/shared/thumbnail";
import { ExternalLinkIcon, XIcon } from "lucide-react";
import { songListItemType } from "./songsCard";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/shadcn/button";

type SongsListItemProps = {
  songDetails: songListItemType;
  onDeleteClick?: (id: string) => void;
  variant?: "default" | "highlighted";
};

export function SongsListItem({
  songDetails,
  onDeleteClick,
  variant = "default",
}: SongsListItemProps) {
  const { id, artist, title, thumbnailURL, deezerId, youtubeURL } = songDetails;
  const isHighlighted = variant === "highlighted";

  const sourceLink = deezerId
    ? { href: `https://www.deezer.com/track/${deezerId}`, label: "Open on Deezer" }
    : youtubeURL
      ? { href: youtubeURL, label: "Watch on YouTube" }
      : null;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-md px-2 py-2 transition-colors",
        isHighlighted ? "bg-accent-foreground/8 px-3" : "hover:bg-accent-foreground/5",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {thumbnailURL ? (
          <Thumbnail
            src={thumbnailURL}
            alt="Album thumbnail"
            sizes={isHighlighted ? "48px" : "40px"}
            className={isHighlighted ? "w-12" : "w-10"}
          />
        ) : (
          <ThumbnailFallback text={artist ?? title} className={isHighlighted ? "w-12" : "w-10"} />
        )}

        <div className="flex min-w-0 flex-col">
          <span
            className={cn("text-gold-light truncate font-semibold", isHighlighted && "text-[15px]")}
          >
            {artist ?? "-"}
          </span>
          <span
            className={cn(
              "text-muted-foreground truncate",
              isHighlighted ? "text-[13.5px]" : "text-[13px]",
            )}
          >
            {title}
          </span>
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
        {onDeleteClick && (
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            aria-label="Remove song"
            onClick={() => onDeleteClick(id)}
          >
            <XIcon className="text-accent-foreground size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
