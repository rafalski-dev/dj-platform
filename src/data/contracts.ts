import "server-only";

import { getSelectedEventOption } from "@/data/dashboard";
import { adminCheck, getSession } from "@/lib/auth-helpers";
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
    // earliest event first; id keeps the order stable across pages
    orderBy: [{ event: { date: "asc" } }, { id: "asc" }],
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

export async function getClientsWithEventsWithoutContract() {
  await adminCheck();

  return await db.client.findMany({
    where: { events: { some: { contract: { is: null }, status: { not: "Cancelled" } } } },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      events: {
        where: { contract: { is: null }, status: { not: "Cancelled" } },
        orderBy: { date: "asc" },
        select: { id: true, name: true, date: true },
      },
    },
  });
}

export type ClientWithEvents = Awaited<
  ReturnType<typeof getClientsWithEventsWithoutContract>
>[number];

export async function getContractDetails(contractId: string) {
  await adminCheck();

  return await db.contract.findUnique({
    where: { id: contractId },
    select: {
      id: true,
      contractNumber: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      sentAt: true,
      signedAt: true,
      signedFileKey: true,
      acceptedAt: true,
      event: { select: { id: true, name: true, clientId: true } },
    },
  });
}

export type ContractDetails = NonNullable<Awaited<ReturnType<typeof getContractDetails>>>;

// Client panel: the contract of the event chosen in the nav selector. Drafts stay hidden –
// they are the DJ's work in progress. An inquiry has no contract yet.
export async function getClientContract() {
  const [session, selected] = await Promise.all([getSession(), getSelectedEventOption()]);
  if (!session || selected?.kind !== "event") return null;

  return await db.contract.findFirst({
    where: {
      status: { not: "Draft" },
      event: { id: selected.id, client: { userId: session.user.id } },
    },
    select: {
      id: true,
      contractNumber: true,
      fileKey: true,
      status: true,
      sentAt: true,
      signedAt: true,
      event: { select: { name: true, startsAt: true, place: true } },
    },
  });
}

export type ClientContract = NonNullable<Awaited<ReturnType<typeof getClientContract>>>;
