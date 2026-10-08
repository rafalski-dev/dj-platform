import { Skeleton } from "@/components/ui/skeleton";
import { ROWS_PER_PAGE } from "@/lib/searchParams";

export function RowsPerPageSkeleton() {
  return (
    <div className="my-auto flex items-center gap-3">
      <Skeleton className="h-4 w-16" />
      <Skeleton
        aria-hidden="true"
        className="flex w-fit flex-row gap-px rounded-sm border border-transparent p-1 select-none"
      >
        {ROWS_PER_PAGE.map((rows) => (
          <span key={rows} className="px-2 py-0.5 text-[13px] text-transparent">
            {rows}
          </span>
        ))}
      </Skeleton>
    </div>
  );
}
