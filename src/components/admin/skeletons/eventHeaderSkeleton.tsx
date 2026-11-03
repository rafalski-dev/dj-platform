import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card";
import { Skeleton, SubSkeleton } from "@/components/ui/shadcn/skeleton";

export function EventHeaderSkeleton() {
  return (
    <Card size="md" className="md:flex-row md:justify-between">
      <div className="flex min-w-0 flex-col gap-5">
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="h-24 w-20 shrink-0 rounded-xl" />
          <div className="flex min-w-0 flex-col gap-2">
            <SubSkeleton className="h-4 w-20" />
            <Skeleton className="h-7.5 w-48 lg:h-8.5 lg:w-72" />
            <div className="flex flex-row flex-wrap items-center gap-2">
              <SubSkeleton className="h-7 w-24 rounded-full" />
              <SubSkeleton className="h-7 w-20 rounded-full" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
            <SubSkeleton className="h-4 w-36" />
            <SubSkeleton className="h-4 w-40" />
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex-row flex-wrap gap-4 md:min-w-1/3 md:flex-col">
        <Skeleton className="h-11 flex-1 md:h-12 md:w-full md:flex-none" />
        <Skeleton className="h-11 flex-1 md:h-12 md:w-full md:flex-none" />
      </CardFooter>
    </Card>
  );
}
