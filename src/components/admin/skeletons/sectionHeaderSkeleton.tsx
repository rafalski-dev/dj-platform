import {
  SectionHeaderAction,
  type SectionHeaderActionProps,
} from "@/components/admin/shared/section/sectionHeader";
import { Skeleton } from "@/components/ui/shadcn/skeleton";

type SectionHeaderSkeletonProps = {
  title: string;
  action?: SectionHeaderActionProps;
};

export function SectionHeaderSkeleton({ title, action }: SectionHeaderSkeletonProps) {
  return (
    <header className="flex flex-col gap-2">
      {/* Same height as the label in SectionHeader: text-sm line (20px) + mb-2 */}
      <Skeleton className="mb-2 h-5 w-20" />
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[32px] leading-none md:text-[36px] lg:text-[40px]">{title}</h1>
        {action && <SectionHeaderAction {...action} />}
      </div>
    </header>
  );
}
