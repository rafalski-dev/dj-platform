import { PlaylistsTableHeader } from "@/components/admin/sections/playlists/playlistsList/playlistsTableHeader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/shadcn/table";
import { Skeleton, SubSkeleton } from "@/components/ui/shadcn/skeleton";

export function PlaylistsTableSkeleton({ count }: { count: number }) {
  return (
    <Table className="table-fixed">
      <PlaylistsTableHeader />
      <TableBody>
        {Array.from({ length: count }).map((_, index) => {
          return (
            <TableRow key={index} className="group">
              {/* Fixed cell height matches the real row height to prevent layout shift  */}
              <TableCell className="text-foreground h-[67.5px]">
                <div className="flex flex-row items-center gap-3">
                  <Skeleton className="size-9 shrink-0 rounded-lg" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4.5 w-36" />
                    <SubSkeleton className="h-3.5 w-16" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4.5 w-18" />
                  <SubSkeleton className="h-4.5 w-28" />
                </div>
              </TableCell>
              <TableCell>
                <SubSkeleton className="h-4.5 w-32" />
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                <Skeleton className="h-7 w-25 rounded-full" />
              </TableCell>
              <TableCell className="pr-0">
                <Skeleton className="size-10" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
