import { PlaylistsCardsSkeleton } from "@/components/admin/skeletons/playlistsCardsSkeleton";
import { PlaylistsTableSkeleton } from "@/components/admin/skeletons/playlistsTableSkeleton";

// Same breakpoint as PlaylistsList: table on desktop, cards on mobile
export function PlaylistsListSkeleton({ count }: { count: number }) {
  return (
    <>
      <div className="hidden lg:block">
        <PlaylistsTableSkeleton count={count} />
      </div>
      <div className="lg:hidden">
        <PlaylistsCardsSkeleton count={count} />
      </div>
    </>
  );
}
