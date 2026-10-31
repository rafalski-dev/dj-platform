import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import "server-only";
import { Prisma } from "../../generated";

function checkEventsWhere(query?: string): Prisma.EventWhereInput {
  if (query)
    return {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { place: { contains: query, mode: "insensitive" } },
        { address: { contains: query, mode: "insensitive" } },
        { client: { name: { contains: query, mode: "insensitive" } } },
      ],
    };

  return {};
}

export async function getPaginatedEvents(limit: number, page: number, query?: string) {
  await adminCheck();

  const rowsToSkip = (page - 1) * limit;

  const events = await db.event.findMany({
    where: checkEventsWhere(query),
    include: { client: { select: { name: true } } },
    omit: {
      addons: true,
      message: true,
      updatedAt: true,
      createdAt: true,
    },
    orderBy: { date: "desc" },
    take: limit,
    skip: rowsToSkip,
  });

  return events;
}

export async function getCountEvents(query?: string) {
  await adminCheck();
  return db.event.count({ where: checkEventsWhere(query) });
}
