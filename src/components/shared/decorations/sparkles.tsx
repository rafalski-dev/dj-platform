import { cn } from "@/lib/utils";

type SparkleProps = {
  className?: string;
  width: string;
  height: string;
  left: string;
  baseOpacity: string;
  baseFloating: string;
  rising: string;
  pulsing: string;
  floating: string;
  display: string;
};

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
}: SparkleProps) {
  return (
    <div
      className={cn("absolute rounded-full mix-blend-screen", className, display)}
      style={{
        top: 0,
        left: `${left}%`,
        width: `${width}px`,
        height: `${height}px`,
        background:
          "radial-gradient(circle, rgb(255, 244, 220) 0%, rgba(235, 211, 160, 0.7) 25%, rgba(235, 211, 160, 0) 90%)",
        opacity: baseOpacity,
        animation: `${rising}, ${pulsing}, ${floating}`,
        "--base-opacity": baseOpacity,
        "--base-floating": baseFloating,
      }}
    />
  );
}
