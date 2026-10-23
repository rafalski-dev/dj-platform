import { cn } from "@/lib/utils";
import { BgGlowOrbProps, FloatingGlowOrbProps, GlowOrbProps } from "@/types/decorations";

export function GlowOrb({ className, ...rest }: GlowOrbProps) {
  return (
    <div
      className={cn(
        "from-accent/17 pointer-events-none absolute h-64 w-64 rounded-full bg-radial to-transparent to-65% blur-md",
        className,
      )}
      {...rest}
    />
  );
}

export function BgGlowOrb({
  className,
  position,
  size,
  maxSize,
  baseOpacity,
  animationDuration,
  ...rest
}: BgGlowOrbProps) {
  return (
    <div
      className={cn("absolute -z-10 rounded-full", position, className)}
      style={{
        width: `${size}vw`,
        height: `${size}vw`,
        maxWidth: maxSize ? `${maxSize}px` : undefined,
        maxHeight: maxSize ? `${maxSize}px` : undefined,
        opacity: baseOpacity,
        background: `radial-gradient(circle, var(--glow-orb), transparent 65%)`,
        animation: `glowDrift ${animationDuration}s ease-in-out infinite`,
      }}
      {...rest}
    />
  );
}

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
  ...rest
}: FloatingGlowOrbProps) {
  return (
    <div
      className={cn("absolute -z-20 rounded-full", className, display)}
      style={
        {
          top: "0",
          left: left ? `${left}%` : undefined,
          translate: "-50% 0",
          width: `${width}px`,
          height: `${height}px`,
          opacity: baseOpacity,
          background:
            "radial-gradient(circle, var(--glow-core) 0%, var(--glow-mid) 20%, var(--glow-edge) 70%)",
          animation: `${rising}, ${floating}`,
          "--base-floating": baseFloating,
        } as React.CSSProperties
      }
      {...rest}
    />
  );
}
