import {
  PageHeaderAction,
  type PageHeaderActionProps,
} from "@/components/dashboards/shared/pageHeader";
import { Skeleton } from "@/components/ui/skeleton";

type PageHeaderSkeletonProps = {
  title: string;
  action?: PageHeaderActionProps;
};

export function PageHeaderSkeleton({ title, action }: PageHeaderSkeletonProps) {
  return (
    <header className="flex flex-col gap-2">
      {/* Same height as the label in PageHeader: text-sm line (20px) + mb-2 */}
      <Skeleton className="mb-2 h-5 w-20" />
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[32px] leading-none md:text-[36px] lg:text-[40px]">{title}</h1>
        {action && <PageHeaderAction {...action} />}
      </div>
    </header>
  );
}
