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
  top,
  left,
  right,
  bottom,
  size,
  baseOpacity,
  animationDuration,
  ...rest
}: BgGlowOrbProps) {
  return (
    <div
      className={cn("absolute rounded-full mix-blend-screen", className)}
      style={{
        top: top ? `${top}%` : undefined,
        right: right ? `${right}%` : undefined,
        bottom: bottom ? `${bottom}%` : undefined,
        left: left ? `${left}%` : undefined,
        width: `${size}vw`,
        height: `${size}vw`,
        opacity: baseOpacity,
        background: `radial-gradient(circle, rgba(214, 176, 116), transparent 65%)`,
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
      className={cn("absolute z-[-5] rounded-full mix-blend-screen", className, display)}
      style={
        {
          top: "0",
          left: left ? `${left}%` : undefined,
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
      {...rest}
    />
  );
}
