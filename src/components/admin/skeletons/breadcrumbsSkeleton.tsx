import { Skeleton, SubSkeleton } from "@/components/ui/shadcn/skeleton";

export function BreadcrumbsSkeleton() {
  return (
    <div className="text-popover-foreground flex flex-row items-center">
      <SubSkeleton className="h-5 w-12" />
      <span className="px-3">/</span>
      <SubSkeleton className="h-5 w-16" />
      <span className="px-3">/</span>
      <Skeleton className="h-5 w-28" />
    </div>
  );
}
