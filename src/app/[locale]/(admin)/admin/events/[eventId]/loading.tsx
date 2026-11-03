import { BreadcrumbsSkeleton } from "@/components/admin/skeletons/breadcrumbsSkeleton";
import { EventDetailsSkeleton } from "@/components/admin/skeletons/eventDetailsSkeleton";
import { EventHeaderSkeleton } from "@/components/admin/skeletons/eventHeaderSkeleton";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <EventHeaderSkeleton />
      <EventDetailsSkeleton />
    </>
  );
}
