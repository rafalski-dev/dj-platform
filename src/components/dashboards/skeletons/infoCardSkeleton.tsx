import { GeneralCardHeader } from "@/components/dashboards/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton, SubSkeleton } from "@/components/ui/skeleton";
import { Pathname } from "@/types/navigation";

type InfoCardSkeletonProps = {
  title: string;
  pathname: Pathname;
  count: number;
};

export function InfoCardSkeleton({ title, pathname, count }: InfoCardSkeletonProps) {
  return (
    <Card size="md" className="flex-1">
      <GeneralCardHeader title={title} pathname={pathname} />
      <CardContent>
        <ul className="flex flex-col gap-3">
          {Array.from({ length: count }).map((_, index) => {
            return (
              <li
                key={index}
                className="bg-background flex flex-row items-center justify-between rounded-lg border px-4 py-3"
              >
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-48" />
                  <SubSkeleton className="h-4 w-32" />
                </div>
                <Skeleton className="size-5" />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
