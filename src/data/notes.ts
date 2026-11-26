import "server-only";

import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";

// The notes of one event, newest first. The admin sees every event's notes,
// a client only the notes of their own event.
export async function getEventNotes(eventId: string) {
  const session = await getSession();
  if (!session) return [];

  const isAdmin = session.user.role === "Admin";

  return await db.note.findMany({
    where: {
      eventId,
      ...(!isAdmin && { event: { client: { userId: session.user.id } } }),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: { select: { id: true, name: true, role: true } },
    },
  });
}

export type EventNote = Awaited<ReturnType<typeof getEventNotes>>[number];
