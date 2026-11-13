"use client";

import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";

export function PlaylistAutoPrint({
  children,
  playlistId,
}: {
  children: React.ReactNode;
  playlistId: string;
}) {
  const { push } = useRouter();

  useEffect(() => {
    function handleAfterPrint() {
      push({ pathname: "/admin/playlists/[playlistId]", params: { playlistId } });
    }

    window.addEventListener("afterprint", handleAfterPrint);
    window.print();

    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, [push, playlistId]);

  return <>{children}</>;
}
