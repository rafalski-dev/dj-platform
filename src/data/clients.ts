import { EventStatus } from "./../../generated/index.d";
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

export async function getCountAllClients() {
  const date = new Date("01-01-2026");
  console.log(date);
  const allClients = await db.client.count({});

  console.log(allClients);
}
