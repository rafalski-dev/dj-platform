import "server-only";

import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { InquiryFilterType } from "@/lib/searchParams";
import { Prisma } from "../../generated";

function checkInquiriesWhere(query?: string, filter?: InquiryFilterType): Prisma.InquiryWhereInput {
  const status: Prisma.InquiryWhereInput =
    filter === "all"
      ? {}
      : { status: filter === "accepted" ? "Accepted" : filter === "rejected" ? "Rejected" : "New" };

  if (!query) return status;

  return {
    ...status,
    OR: [
      { firstName: { contains: query, mode: "insensitive" } },
      { lastName: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { place: { contains: query, mode: "insensitive" } },
    ],
  };
}

// Dates that already have an event – an inquiry for such a date can't be accepted as is
async function getTakenDates(dates: Date[]) {
  const events = await db.event.findMany({
    where: { date: { in: dates }, status: { not: "Cancelled" } },
    select: { date: true },
  });

  return new Set(events.map(({ date }) => date.getTime()));
}

export async function getPaginatedInquiries(
  limit: number,
  page: number,
  query?: string,
  filter?: InquiryFilterType,
) {
  await adminCheck();

  const inquiries = await db.inquiry.findMany({
    where: checkInquiriesWhere(query, filter),
    select: {
      id: true,
      status: true,
      firstName: true,
      lastName: true,
      date: true,
      type: true,
      place: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const takenDates = await getTakenDates(inquiries.map(({ date }) => date));

  return inquiries.map((inquiry) => ({
    ...inquiry,
    // only matters while the inquiry still waits for a decision
    isDateTaken: inquiry.status === "New" && takenDates.has(inquiry.date.getTime()),
  }));
}

export async function getCountInquiries(query?: string, filter?: InquiryFilterType) {
  await adminCheck();
  return db.inquiry.count({ where: checkInquiriesWhere(query, filter) });
}

export async function getInquiryDetails(inquiryId: string) {
  await adminCheck();

  const inquiry = await db.inquiry.findUnique({
    where: { id: inquiryId },
    include: { event: { select: { id: true, name: true } } },
  });

  if (!inquiry) return null;

  const [takenDates, existingClient] = await Promise.all([
    getTakenDates([inquiry.date]),
    // accepting links the event to this client instead of creating a new one
    db.client.findUnique({ where: { email: inquiry.email }, select: { id: true, name: true } }),
  ]);

  return {
    ...inquiry,
    isDateTaken: inquiry.status === "New" && takenDates.has(inquiry.date.getTime()),
    existingClient,
  };
}

export type InquiryDetails = NonNullable<Awaited<ReturnType<typeof getInquiryDetails>>>;
