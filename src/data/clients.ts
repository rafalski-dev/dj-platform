import { getCurrentYear } from "@/lib/utils";
import { db } from "@/lib/db";
import { FilterType } from "@/lib/searchParams";
import { adminCheck } from "@/lib/auth-helpers";

function getClientsWhere(query?: string) {
  if (!query) return {};

  const phoneQuery = query.replace(/[\s-]/g, "") || query;

  return {
    OR: [
      { name: { contains: query, mode: "insensitive" as const } },
      { email: { contains: query, mode: "insensitive" as const } },
      { phone: { contains: phoneQuery } },
    ],
  };
}

export function getStartOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getUpcomingEventWhere() {
  return {
    eventDate: { gte: getStartOfToday() },
    eventStatus: { not: "Cancelled" as const },
  };
}

function getFilterWhere(filter?: FilterType) {
  if (filter === "active") return { events: { some: getUpcomingEventWhere() } };

  if (filter === "past") {
    return {
      AND: [{ events: { some: {} } }, { events: { none: getUpcomingEventWhere() } }],
    };
  }

  if (filter === "no-event") return { events: { none: {} } };

  return {};
}

export async function getPaginationedClients(
  rowsLimit: number,
  page: number,
  query?: string,
  filter?: FilterType,
) {
  await adminCheck();

  const rowsToSkip = (page - 1) * rowsLimit;

  const clients = await db.client.findMany({
    where: { AND: [getClientsWhere(query), getFilterWhere(filter)] },
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
        orderBy: { eventDate: "asc" },
      },
    },
  });

  return clients;
}

export async function getCountClients(query?: string, filter?: FilterType) {
  await adminCheck();

  const numberOfclients = await db.client.count({
    where: { AND: [getClientsWhere(query), getFilterWhere(filter)] },
  });
  return numberOfclients;
}

// cards data
export async function getClientsStats() {
  await adminCheck();

  const [newThisSeason, activeClients, withoutEvent, needsAttention] = await Promise.all([
    db.client.count({ where: { createdAt: { gte: new Date(getCurrentYear(), 0, 1) } } }),

    db.client.count({ where: { events: { some: getUpcomingEventWhere() } } }),

    db.client.count({ where: { events: { none: {} } } }),

    db.client.count({ where: { OR: [{ email: null }, { phone: null }] } }),
  ]);

  return { newThisSeason, activeClients, withoutEvent, needsAttention };
}
