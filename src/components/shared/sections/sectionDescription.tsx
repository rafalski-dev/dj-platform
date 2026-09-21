import { cn } from "@/lib/utils";
import { SectionDescriptionProps } from "@/types/sharedComponents";

export function SectionDescription({ children, className }: SectionDescriptionProps) {
  return (
    <p className={cn("text-muted-foreground text-[17px]/8 font-light md:text-[18px]", className)}>
      {children}
    </p>
  );
}
