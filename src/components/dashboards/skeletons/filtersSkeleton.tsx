import { Skeleton } from "@/components/ui/skeleton";

export function FiltersSkeleton({ count }: { count: number }) {
  return (
    <div className="flex flex-row gap-2">
      {Array.from({ length: count }).map((_, index) => {
        return <Skeleton key={index} className="h-10 w-17.5" />;
      })}
    </div>
  );
}
