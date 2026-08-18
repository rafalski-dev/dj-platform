import { cn } from "@/lib/utils";
import { GlowOrbProps } from "@/types/decorations";

export function GlowOrb({ className }: GlowOrbProps) {
  return (
    <div
      className={cn(
        "from-accent/17 pointer-events-none absolute h-64 w-64 rounded-full bg-radial to-transparent to-65% blur-md",
        className,
      )}
    />
  );
}
