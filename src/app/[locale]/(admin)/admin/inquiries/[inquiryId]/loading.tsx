import { BreadcrumbsSkeleton } from "@/components/admin/skeletons/breadcrumbsSkeleton";
import { EventDetailsSkeleton } from "@/components/admin/skeletons/eventDetailsSkeleton";
import { EventHeaderSkeleton } from "@/components/admin/skeletons/eventHeaderSkeleton";

// Same layout as the event details (header + two columns), so the same skeletons
export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <EventHeaderSkeleton />
      <EventDetailsSkeleton />
    </>
  );
}
