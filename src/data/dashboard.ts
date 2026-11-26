import "server-only";

import { SELECTED_EVENT_COOKIE } from "@/constants/dashboard";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getMissingFields } from "@/lib/missingFields";
import { getRelevantEvent } from "@/lib/utils";
import { cookies } from "next/headers";
import { cache } from "react";

// Everything the client can pick in the nav selector: their events + inquiries that still
// wait for the DJ. A rejected inquiry isn't here – for the client it's the same as nothing.
export const getClientEventOptions = cache(async () => {
  const session = await getSession();
  if (!session) return [];

  const [events, inquiries] = await Promise.all([
    db.event.findMany({
      where: { client: { userId: session.user.id }, status: { not: "Archived" } },
      select: {
        id: true,
        name: true,
        type: true,
        altType: true,
        date: true,
        status: true,
        place: true,
      },
      orderBy: { date: "asc" },
    }),
    // There is no Client yet before the DJ accepts – found by the account's email,
    // only a VERIFIED one (the same rule as linkClientAccount)
    session.user.emailVerified
      ? db.inquiry.findMany({
          where: { email: session.user.email, status: "New" },
          select: { id: true, type: true, place: true, date: true },
          orderBy: { date: "asc" },
        })
      : [],
  ]);

  return [
    ...events.map((event) => ({ kind: "event" as const, ...event })),
    ...inquiries.map((inquiry) => ({ kind: "inquiry" as const, ...inquiry })),
  ];
});

export type ClientEventOption = Awaited<ReturnType<typeof getClientEventOptions>>[number];

export function getOptionValue({ kind, id }: Pick<ClientEventOption, "kind" | "id">) {
  return `${kind}:${id}`;
}

// What the selected event still needs for the contract – checked again against the user
export async function getEventMissingFields(eventId: string) {
  const session = await getSession();
  if (!session) return [];

  const event = await db.event.findFirst({
    where: { id: eventId, client: { userId: session.user.id } },
    select: {
      startsAt: true,
      endsAt: true,
      address: true,
      client: { select: { streetAndNumber: true, postcode: true, city: true } },
    },
  });

  return event ? getMissingFields(event) : [];
}

// The selected event's time and place for the client's edit form – checked against the user
export async function getEventDetailsToEdit(eventId: string) {
  const session = await getSession();
  if (!session) return null;

  return db.event.findFirst({
    where: { id: eventId, client: { userId: session.user.id } },
    select: {
      id: true,
      date: true,
      startsAt: true,
      endsAt: true,
      place: true,
      address: true,
      wedding: {
        select: {
          weddingKind: true,
          ceremonyStartsAt: true,
          ceremonyPlace: true,
          ceremonyAddress: true,
        },
      },
    },
  });
}

// The selected wedding's people for the client's Wedding page – checked against the user.
// null for an event that isn't a wedding.
export async function getWeddingDetailsToEdit(eventId: string) {
  const session = await getSession();
  if (!session) return null;

  return db.event.findFirst({
    where: { id: eventId, type: "Wedding", client: { userId: session.user.id } },
    select: {
      id: true,
      wedding: {
        select: {
          bride: true,
          groom: true,
          brideWitness: true,
          groomWitness: true,
          brideMother: true,
          brideFather: true,
          groomMother: true,
          groomFather: true,
        },
      },
    },
  });
}

// What goes into the contract of the selected event – shown read-only while the DJ prepares it,
// so the client can still fix something. Checked against the user.
export async function getContractDetails(eventId: string) {
  const session = await getSession();
  if (!session) return null;

  return db.event.findFirst({
    where: { id: eventId, client: { userId: session.user.id } },
    select: {
      date: true,
      startsAt: true,
      endsAt: true,
      place: true,
      address: true,
      package: true,
      addons: true,
      wedding: {
        select: {
          weddingKind: true,
          ceremonyStartsAt: true,
          ceremonyPlace: true,
          ceremonyAddress: true,
        },
      },
      client: {
        select: {
          clientType: true,
          name: true,
          taxId: true,
          phone: true,
          streetAndNumber: true,
          postcode: true,
          city: true,
        },
      },
    },
  });
}

export type ContractDetails = NonNullable<Awaited<ReturnType<typeof getContractDetails>>>;

// The client's own details for the My details form – null until the DJ links them to a Client
export async function getMyDetails() {
  const session = await getSession();
  if (!session) return null;

  return db.client.findUnique({
    where: { userId: session.user.id },
    select: {
      firstName: true,
      lastName: true,
      phone: true,
      streetAndNumber: true,
      postcode: true,
      city: true,
      region: true,
      country: true,
    },
  });
}

// The cookie only says what the client chose – it's checked against their own options,
// so someone else's id in it shows nothing. No (valid) choice → the nearest event.
export const getSelectedEventOption = cache(async () => {
  const options = await getClientEventOptions();
  const cookieValue = (await cookies()).get(SELECTED_EVENT_COOKIE)?.value;

  const chosen = options.find((option) => getOptionValue(option) === cookieValue);
  if (chosen) return chosen;

  const events = options.filter((option) => option.kind === "event");
  return getRelevantEvent(events) ?? options[0] ?? null;
});
