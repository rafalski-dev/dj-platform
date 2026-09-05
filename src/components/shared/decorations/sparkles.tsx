import { cn } from "@/lib/utils";
import { SparkleProps } from "@/types/decorations";

export function Sparkle({
  className,
  width,
  height,
  left,
  baseOpacity,
  baseFloating,
  rising,
  pulsing,
  floating,
  display,
  ...rest
}: SparkleProps) {
  return (
    <div
      className={cn("absolute rounded-full", className, display)}
      style={
        {
          top: 0,
          left: left ? `${left}%` : undefined,
          width: `${width}px`,
          height: `${height}px`,
          background:
            "radial-gradient(circle, rgb(255, 244, 220) 0%, rgba(235, 211, 160, 0.7) 25%, rgba(235, 211, 160, 0) 90%)",
          opacity: baseOpacity,
          animation: `${rising}, ${pulsing}, ${floating}`,
          "--base-opacity": baseOpacity,
          "--base-floating": baseFloating,
        } as React.CSSProperties & {
          "--base-opacity": string;
          "--base-floating": string;
        }
      }
      {...rest}
    />
  );
}
