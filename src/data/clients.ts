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
    include: {
      events: {
        select: { eventDate: true, eventStatus: true, eventType: true },
        orderBy: { eventDate: "asc" },
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
