import "server-only";

import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Prisma } from "../../generated";

function getPlaylistsWhere(query?: string): Prisma.PlaylistWhereInput {
  if (!query) return {};

  return {
    OR: [
      { name: { contains: query, mode: "insensitive" } },
      { event: { name: { contains: query, mode: "insensitive" } } },
      { event: { client: { name: { contains: query, mode: "insensitive" } } } },
    ],
  };
}

export async function getPaginatedPlaylists(rowsLimit: number, page: number, query?: string) {
  await adminCheck();
  const rowsToSkip = (page - 1) * rowsLimit;

  return await db.playlist.findMany({
    where: getPlaylistsWhere(query),
    take: rowsLimit,
    skip: rowsToSkip,
    orderBy: [{ event: { date: "desc" } }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      _count: { select: { songs: true } },
      event: {
        select: {
          type: true,
          altType: true,
          date: true,
          status: true,
          client: { select: { name: true } },
        },
      },
    },
  });
}

export type PlaylistItem = Awaited<ReturnType<typeof getPaginatedPlaylists>>[number];

export async function getCountPlaylists(query?: string) {
  await adminCheck();

  return await db.playlist.count({ where: getPlaylistsWhere(query) });
}
