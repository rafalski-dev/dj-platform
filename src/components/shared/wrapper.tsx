import { cn } from "@/lib/utils";
import { WrapperProps } from "@/types/sharedComponents";

export function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={cn("mx-auto h-full w-full max-w-7xl px-5 md:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
