import { Skeleton } from "@/components/ui/skeleton";

export function PaginationSkeleton({ pages = 5 }: { pages?: number }) {
  return (
    <div className="mx-auto flex flex-row items-center gap-x-1.5">
      <Skeleton className="h-8 w-10" />
      {Array.from({ length: pages }, (_, index) => (
        <Skeleton key={index} className="size-8" />
      ))}
      <Skeleton className="h-8 w-10" />
    </div>
  );
}
