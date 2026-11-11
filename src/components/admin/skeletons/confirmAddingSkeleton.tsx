import { Skeleton } from "@/components/ui/shadcn/skeleton";

export function ConfirmAddingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-6 w-28" />
      <div className="bg-accent-foreground/8 flex flex-row items-center gap-4 rounded-md px-3 py-2">
        <Skeleton className="aspect-video w-18 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-2/5 max-w-25" />
          <Skeleton className="h-[13px] w-4/5 max-w-50" />
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
