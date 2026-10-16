import { ClientsCardsSkeleton } from "@/components/dashboards/skeletons/clientsCardsSkeleton";
import { ClientsTableSkeleton } from "@/components/dashboards/skeletons/clientsTableSkeleton";

// Same breakpoint as ClientsList: table on desktop, cards on mobile
export function ClientsListSkeleton({ count }: { count: number }) {
  return (
    <>
      <div className="hidden lg:block">
        <ClientsTableSkeleton count={count} />
      </div>
      <div className="lg:hidden">
        <ClientsCardsSkeleton count={count} />
      </div>
    </>
  );
}
