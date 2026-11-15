import "server-only";

import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Prisma } from "../../generated";

function getContractsWhere(query?: string): Prisma.ContractWhereInput {
  if (!query) return {};

  return {
    OR: [
      { contractNumber: { contains: query, mode: "insensitive" } },
      { event: { name: { contains: query, mode: "insensitive" } } },
      { event: { client: { name: { contains: query, mode: "insensitive" } } } },
    ],
  };
}

export async function getPaginatedContracts(rowsLimit: number, page: number, query?: string) {
  await adminCheck();
  const rowsToSkip = (page - 1) * rowsLimit;

  return await db.contract.findMany({
    where: getContractsWhere(query),
    take: rowsLimit,
    skip: rowsToSkip,
    orderBy: [{ event: { date: "desc" } }, { id: "asc" }],
    select: {
      id: true,
      contractNumber: true,
      status: true,
      event: {
        select: {
          name: true,
          type: true,
          altType: true,
          date: true,
          client: { select: { name: true } },
        },
      },
    },
  });
}

export type ContractItem = Awaited<ReturnType<typeof getPaginatedContracts>>[number];

export async function getCountContracts(query?: string) {
  await adminCheck();

  return await db.contract.count({ where: getContractsWhere(query) });
}
