import "server-only";

import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";

export async function getClientDetails(clientId: string) {
  await adminCheck();

  return await db.client.findUnique({
    where: { id: clientId },
    include: {
      events: { select: { eventStatus: true, eventDate: true }, orderBy: { eventDate: "asc" } },
    },
  });
}

export async function getClientEvents(clientId: string) {
  await adminCheck();

  return await db.event.findMany({
    where: { clientId: clientId },
    select: { id: true, eventType: true, eventDate: true, updatedAt: true },
    orderBy: { eventDate: "desc" },
  });
}

export async function getClientContracts(clientId: string) {
  await adminCheck();

  return await db.contract.findMany({
    where: { event: { clientId: clientId } },
    select: { id: true, contractNumber: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getClientPlaylists(clientId: string) {
  await adminCheck();

  return db.playlist.findMany({
    where: { event: { clientId: clientId } },
    select: { id: true, name: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getClientToEdit(clientId: string) {
  await adminCheck();

  return db.client.findUnique({
    where: { id: clientId },
    omit: { updatedAt: true, createdAt: true },
  });
}
