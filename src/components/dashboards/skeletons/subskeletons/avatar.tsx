import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function AvatarSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-9 w-9 rounded-full", className)}></Skeleton>;
}
