"use client";

import { DropdownMenuItem } from "@/components/ui/shadcn/dropdown-menu";

type DownloadCSVItemProps = {
  children: React.ReactNode;
  playlistId: string;
};

export function DownloadCSVItem({ children, playlistId }: DownloadCSVItemProps) {
  return (
    <DropdownMenuItem render={<a href={`/api/${playlistId}/csv`} download />}>
      {children}
    </DropdownMenuItem>
  );
}
