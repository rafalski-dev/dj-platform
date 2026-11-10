import { Skeleton } from "@/components/ui/shadcn/skeleton";

export function PlaylistsDropdownSkeleton() {
  return (
    <ul className="scroll-bar-edited flex max-h-70 w-full flex-col items-start overflow-y-scroll pb-2 pl-2">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <li
            key={index}
            className="flex w-full flex-row items-center justify-between gap-4 rounded-md px-3 py-2"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Skeleton className="size-10 shrink-0" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Skeleton className="h-[15px] w-2/5 max-w-25" />
                <Skeleton className="h-[13px] w-4/5 max-w-50" />
              </div>
            </div>
            <Skeleton className="size-9 shrink-0 rounded-full" />
          </li>
        ))}
    </ul>
  );
}
