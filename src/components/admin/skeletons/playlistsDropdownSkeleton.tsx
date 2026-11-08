import { Skeleton } from "@/components/ui/shadcn/skeleton";

export function PlaylistsDropdownSkeleton() {
  return (
    <ul className="scroll-bar-edited flex max-h-70 w-full flex-col items-start overflow-y-scroll pb-2 pl-2">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <li
            key={index}
            className="flex w-full flex-row justify-between gap-4 rounded-md px-3 py-2"
          >
            <div className="flex gap-3">
              <Skeleton className="h-9.5 w-9.5" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-[15px] w-25" />
                <Skeleton className="h-[13px] w-50" />
              </div>
            </div>
            <Skeleton className="size-9 rounded-full" />
          </li>
        ))}
    </ul>
  );
}
