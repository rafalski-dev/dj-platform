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

type FloatingGlowOrbProps = {
  className?: string;
  top?: string;
  left: string;
  width: string;
  height: string;
  display: string;
  baseOpacity?: string;
  baseFloating: string;
  rising: string;
  floating: string;
};

export function FloatingGlowOrb({
  className,
  left,
  width,
  height,
  display,
  rising,
  floating,
  baseOpacity,
  baseFloating,
}: FloatingGlowOrbProps) {
  return (
    <div
      className={cn("absolute -z-1 rounded-full", className, display)}
      style={
        {
          top: "0",
          left: `${left}%`,
          translate: "-50% 0",
          width: `${width}px`,
          height: `${height}px`,
          opacity: baseOpacity,
          background:
            "radial-gradient(circle, rgba(255, 244, 220) 0%, rgba(235, 211, 160, 0.7) 20%, rgba(235, 211, 160, 0) 70%)",
          animation: `${rising}, ${floating}`,
          "--base-floating": baseFloating,
        } as React.CSSProperties
      }
    />
  );
}
