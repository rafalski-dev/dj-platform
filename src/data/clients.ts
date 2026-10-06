import { getCurrentYear } from "@/lib/utils";
import { db } from "@/lib/db";

function getClientsWhere(query?: string) {
  if (!query) return {};

  return {
    OR: [
      { name: { contains: query, mode: "insensitive" as const } },
      { email: { contains: query, mode: "insensitive" as const } },
      { phone: { contains: query } },
    ],
  };
}

export async function getPaginationedClients(rowsLimit: number, page: number, query?: string) {
  const rowsToSkip = (page - 1) * rowsLimit;

  const clients = await db.client.findMany({
    where: getClientsWhere(query),
    take: rowsLimit,
    skip: rowsToSkip,
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      events: {
        select: { eventDate: true, eventType: true, eventStatus: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return clients;
}

export async function getCountClients(query?: string) {
  const numberOfclients = await db.client.count({
    where: getClientsWhere(query),
  });
  return numberOfclients;
}

// cards data
export async function getClientsStats() {
  const startOfYear = new Date(getCurrentYear(), 0, 1);
  const upcomingEvent = {
    eventDate: { gte: new Date() },
    eventStatus: { not: "Cancelled" as const },
  };

  const [newThisSeason, activeClients, withoutEvent, needsAttention] = await Promise.all([
    db.client.count({ where: { createdAt: { gte: startOfYear } } }),

    db.client.count({ where: { events: { some: upcomingEvent } } }),

    db.client.count({ where: { events: { none: {} } } }),

    db.client.count({ where: { OR: [{ email: null }, { phone: null }] } }),
  ]);

  return { newThisSeason, activeClients, withoutEvent, needsAttention };
}
