import { Skeleton, SubSkeleton } from "@/components/ui/skeleton";

export function ClientsCardsSkeleton({ count }: { count: number }) {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="bg-card border-border flex flex-col gap-3 rounded-2xl border p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4.5 w-32" />
                <SubSkeleton className="h-3.5 w-40" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
          </div>
          <div className="border-border flex flex-col gap-2 border-t pt-3">
            <SubSkeleton className="h-4 w-48" />
            <SubSkeleton className="h-4 w-28" />
          </div>
        </li>
      ))}
    </ul>
  );
}
