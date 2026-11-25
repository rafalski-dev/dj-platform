import "server-only";

import { getSelectedEventOption } from "@/data/dashboard";
import { adminCheck, getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Prisma } from "../../generated";

function getPlaylistsWhere(query?: string): Prisma.PlaylistWhereInput {
  if (!query) return {};

  return {
    OR: [
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
      _count: { select: { songs: true } },
      event: {
        select: {
          name: true,
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

// The same data for the admin and the client page – they share the playlist components
const playlistDetailsInclude = {
  songs: { orderBy: { createdAt: "desc" } },
  event: {
    select: {
      id: true,
      name: true,
      type: true,
      altType: true,
      date: true,
      status: true,
      client: { select: { id: true, name: true } },
    },
  },
} satisfies Prisma.PlaylistInclude;

export async function getPlaylistDetails(playlistId: string) {
  await adminCheck();

  return await db.playlist.findUnique({
    where: { id: playlistId },
    include: playlistDetailsInclude,
  });
}

// Client panel: the playlist of the event chosen in the nav selector.
// Events the DJ added by hand have no playlist yet – an empty one is created on the first visit.
export async function getClientPlaylist() {
  const [session, selected] = await Promise.all([getSession(), getSelectedEventOption()]);
  if (!session || selected?.kind !== "event") return null;

  const event = await db.event.findFirst({
    where: { id: selected.id, client: { userId: session.user.id } },
    select: { id: true },
  });
  if (!event) return null;

  return await db.playlist.upsert({
    where: { eventId: event.id },
    create: { eventId: event.id },
    update: {},
    include: playlistDetailsInclude,
  });
}

export type PlaylistDetails = NonNullable<Awaited<ReturnType<typeof getPlaylistDetails>>>;

// Client overview: only what the Playlist step card needs. No playlist yet = no songs yet
// (it's created when the client first opens the Playlist page).
export async function getClientPlaylistSummary() {
  const [session, selected] = await Promise.all([getSession(), getSelectedEventOption()]);
  if (!session || selected?.kind !== "event") return null;

  return await db.playlist.findFirst({
    where: { event: { id: selected.id, client: { userId: session.user.id } } },
    select: { status: true, _count: { select: { songs: true } } },
  });
}
