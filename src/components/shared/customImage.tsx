import { cn } from "@/lib/utils";
import { CustomImageProps } from "@/types/sharedComponents";
import Image from "next/image";

export function CustomImage({
  src,
  alt,
  ratio,
  loading,
  priority,
  sizes,
  contrast,
  hue,
  width,
}: CustomImageProps) {
  return (
    <div
      className={cn(
        "border-border/20 shadow-accent/10 relative aspect-3/2 overflow-hidden rounded-4xl border shadow-lg",
        ratio,
        width,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading={loading}
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", contrast, hue)}
      />
    </div>
  );
}
