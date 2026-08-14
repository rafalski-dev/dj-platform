import { cn } from "@/lib/utils";
import { SectionTitleProps } from "@/types/sharedComponents";

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn("mb-5 text-[34px]/11 md:mb-6 md:text-[38px]/12 lg:text-[54px]/16", className)}
    >
      {children}
    </h2>
  );
}
