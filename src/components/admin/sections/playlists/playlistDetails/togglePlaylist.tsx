"use client";

import { togglePlaylistAction } from "@/actions/playlist";
import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import { LockIcon, LockOpenIcon } from "lucide-react";
import { useState } from "react";

export function TogglePlaylist({
  playlistId,
  isLocked,
}: {
  playlistId: string;
  isLocked: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function togglePlaylist() {
    setIsLoading(true);
    const response = await togglePlaylistAction(playlistId);
    if (!response.success) {
      toast.add({ type: "error", title: "Playlist wasn't changed", description: "" });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast.add({ type: "success", title: response.message });
  }
  return (
    <Button size="sm" onClick={togglePlaylist} disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner /> Processing
        </>
      ) : isLocked ? (
        <>
          <LockOpenIcon /> Unlock
        </>
      ) : (
        <>
          <LockIcon /> Lock
        </>
      )}
    </Button>
  );
}
