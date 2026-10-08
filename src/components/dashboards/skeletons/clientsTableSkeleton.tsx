import { ClientsTableHeader } from "@/components/dashboards/admin/clients/clientsTableHeader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { AvatarSkeleton } from "@/components/dashboards/skeletons/subskeletons/avatar";
import { Skeleton, SubSkeleton } from "@/components/ui/skeleton";

export function ClientsTableSkeleton({ count }: { count: number }) {
  return (
    <Table className="table-fixed">
      <ClientsTableHeader />
      <TableBody>
        {Array.from({ length: count }).map((_, index) => {
          return (
            <TableRow key={index} className="group">
              {/* Fixed cell height matches the real row height to prevent layout shift  */}
              <TableCell className="text-foreground h-[67.5px]">
                <div className="flex flex-row items-center gap-3">
                  <AvatarSkeleton />
                  <SubSkeleton className="h-5 w-25" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4.5 w-55" />
                  <SubSkeleton className="h-4.5 w-25" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4.5 w-18" />
                  <SubSkeleton className="h-4.5 w-28" />
                </div>
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
