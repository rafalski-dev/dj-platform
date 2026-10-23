import "server-only";

import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getCurrentYear, getStartOfToday } from "@/lib/utils";

export async function getHomeStats() {
  await adminCheck();
  const currentYear = getCurrentYear();
  const today = getStartOfToday();
  const in30Days = new Date(today);
  in30Days.setDate(today.getDate() + 30);

  const [events, pending, activeWithoutContract, activeWithoutPlaylist] = await Promise.all([
    db.event.count({
      where: {
        eventDate: {
          gte: new Date(currentYear, 0, 1),
          lt: new Date(Date.UTC(currentYear + 1, 0, 1)),
        },
        eventStatus: { not: "Cancelled" },
      },
    }),
    db.event.count({ where: { eventStatus: "Pending", eventDate: { gte: today } } }),
    db.event.count({
      where: { eventStatus: "Active", contract: null, eventDate: { gte: today } },
    }),
    db.event.count({
      where: {
        eventStatus: "Active",
        playlist: null,
        eventDate: { gte: today, lt: in30Days },
      },
    }),
  ]);

  return { events, pending, activeWithoutContract, activeWithoutPlaylist };
}
