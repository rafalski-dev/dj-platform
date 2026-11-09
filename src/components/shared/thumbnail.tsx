import { cn } from "@/lib/utils";
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
    <div className={cn("relative shrink-0 overflow-hidden rounded-md", ratio, className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
