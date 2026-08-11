import { cn } from "@/lib/utils";
import { SectionProps } from "@/types/shared";

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn("border-border/20 w-full border-t py-16 md:py-24 lg:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}
