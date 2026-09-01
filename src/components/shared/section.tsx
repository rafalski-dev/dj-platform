import { cn } from "@/lib/utils";
import { SectionProps } from "@/types/sharedComponents";

export function Section({ children, className, anchorLink, ...props }: SectionProps) {
  return (
    <section
      id={anchorLink}
      className={cn("border-border/20 w-full border-t py-16 md:py-24 lg:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}
