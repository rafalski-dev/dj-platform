import { cn } from "@/lib/utils";
import { SectionDescriptionProps } from "@/types/shared";

export function SectionDescription({ children, className = "" }: SectionDescriptionProps) {
  return (
    <p className={cn("text-muted-foreground text-[18px]/8 font-light", className)}>{children}</p>
  );
}
