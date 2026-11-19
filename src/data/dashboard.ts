import "server-only";

import { SELECTED_EVENT_COOKIE } from "@/constants/dashboard";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
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
      select: { id: true, name: true, type: true, altType: true, date: true, status: true },
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
