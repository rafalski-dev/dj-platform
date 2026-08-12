import { cn } from "@/lib/utils";
import { SectionTitleProps } from "@/types/shared";

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn("mb-6 text-[34px]/13 md:mb-8 md:text-[38px]/13 lg:text-[54px]/18", className)}
    >
      {children}
    </h2>
  );
}
