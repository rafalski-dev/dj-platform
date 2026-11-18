import { Skeleton, SubSkeleton } from "@/components/ui/shadcn/skeleton";

// Same grid and card shape as InquiriesList
export function InquiriesListSkeleton({ count }: { count: number }) {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="bg-card border-border flex flex-col gap-5 rounded-2xl border p-5 md:p-6"
        >
          <div className="flex items-start gap-4 border-b pb-5">
            <div className="flex flex-1 flex-col gap-2.5">
              <SubSkeleton className="h-3.5 w-24" />
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-24 w-20 shrink-0 rounded-xl" />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1.5">
              <SubSkeleton className="h-3 w-16" />
              <Skeleton className="h-4.5 w-36" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <SubSkeleton className="h-3 w-16" />
              <Skeleton className="h-4.5 w-20" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
