import { cn } from "@/lib/utils";
import { PlayIcon } from "lucide-react";
import Image from "next/image";

type ThumbnailProps = {
  src: string;
  alt: string;
  ratio?: "aspect-video" | "aspect-square";
  sizes?: string;
  className?: string;
};

export function Thumbnail({
  src,
  ratio = "aspect-square",
  sizes = "40px",
  className = "w-10",
  alt,
}: ThumbnailProps) {
  return (
    <div className={cn("relative shrink-0 overflow-hidden rounded-sm", ratio, className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

type ThumbnailVideoProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
};

export function ThumbnailVideo({
  src,
  alt,
  sizes = "64px",
  className = "w-18",
}: ThumbnailVideoProps) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <Thumbnail src={src} alt={alt} ratio="aspect-video" sizes={sizes} className="w-full" />

      <div className="bg-background/30 absolute inset-0 flex items-center justify-center rounded-md">
        <span className="bg-background/70 text-foreground flex size-6 items-center justify-center rounded-full">
          <PlayIcon className="size-3 fill-current" />
        </span>
      </div>
    </div>
  );
}

type ThumbnailFallbackProps = {
  text: string;
  className?: string;
};

export function ThumbnailFallback({ text, className = "w-10" }: ThumbnailFallbackProps) {
  const initial = text.trim().charAt(0).toUpperCase();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "text-accent-foreground flex aspect-square shrink-0 items-center justify-center rounded-sm border text-base font-medium",
        className,
      )}
    >
      {initial}
    </div>
  );
}
