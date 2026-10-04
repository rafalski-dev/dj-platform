import { db } from "@/lib/db";

export async function getPaginationedClients(rowsLimit: number, page: number) {
  const rowsToSkip = (page - 1) * rowsLimit;

  const clients = await db.client.findMany({
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

export async function getCountClients() {
  const numberOfclients = await db.client.count();
  return numberOfclients;
}
