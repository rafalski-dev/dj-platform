import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { Skeleton, SubSkeleton } from "@/components/ui/shadcn/skeleton";

const DETAILS = 5;
const CLIENT_ROWS = 2;
const LIST_CARDS = 2;

function CardTitleSkeleton() {
  return (
    <CardHeader>
      <Skeleton className="h-7 w-40" />
    </CardHeader>
  );
}

function DateAndPlaceSkeleton() {
  return (
    <Card size="md">
      <CardTitleSkeleton />
      <CardContent className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: DETAILS }).map((_, index) => {
            return (
              <div key={index} className="flex flex-col gap-1">
                <SubSkeleton className="h-4 w-16" />
                <Skeleton className="h-5.5 w-36" />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 border-t pt-5">
          <SubSkeleton className="h-4.5 w-24" />
          <Skeleton className="h-3 w-full rounded-full" />
          <SubSkeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

function PackageSkeleton() {
  return (
    <Card size="md">
      <CardTitleSkeleton />
      <CardContent className="flex flex-col gap-5">
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="flex flex-row flex-wrap gap-2">
          <SubSkeleton className="h-7 w-24 rounded-full" />
          <SubSkeleton className="h-7 w-28 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

function ClientSkeleton() {
  return (
    <Card size="md">
      <CardTitleSkeleton />
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-36" />
            <SubSkeleton className="h-4 w-24" />
          </div>
        </div>
        <div>
          {Array.from({ length: CLIENT_ROWS }).map((_, index) => {
            return (
              <div key={index} className="flex justify-between gap-3 border-t py-3">
                <SubSkeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-32" />
              </div>
            );
          })}
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

function ListCardSkeleton() {
  return (
    <Card size="md">
      <CardTitleSkeleton />
      <CardContent>
        <div className="bg-background flex flex-row items-center justify-between rounded-lg border px-4 py-3">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-32" />
            <SubSkeleton className="h-4 w-24" />
          </div>
          <Skeleton className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}

export function EventDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
      <div className="flex min-w-0 flex-col gap-5">
        <DateAndPlaceSkeleton />
        <PackageSkeleton />
      </div>
      <div className="flex min-w-0 flex-col gap-5">
        <ClientSkeleton />
        {Array.from({ length: LIST_CARDS }).map((_, index) => (
          <ListCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
