import { BreadcrumbsSkeleton } from "@/components/admin/skeletons/breadcrumbsSkeleton";
import { ClientDetailsSkeleton } from "@/components/admin/skeletons/clientDetailsSkeleton";
import { ClientHeaderSkeleton } from "@/components/admin/skeletons/clientHeaderSkeleton";
import { ClientListsSkeleton } from "@/components/admin/skeletons/clientListsSkeleton";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <ClientHeaderSkeleton />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-start">
        <ClientDetailsSkeleton />
        <div className="flex flex-col gap-5">
          <ClientListsSkeleton />
        </div>
      </div>
    </>
  );
}
