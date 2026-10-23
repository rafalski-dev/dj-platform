import "server-only";

import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getStartOfToday } from "@/lib/utils";

export async function getHomeStats() {
  await adminCheck();
  const today = getStartOfToday();
  const in30Days = new Date(today);
  in30Days.setDate(today.getDate() + 30);

  const [contracts, pending, activeWithoutContract, activeWithoutPlaylist] = await Promise.all([
    db.contract.count(),
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

  return { contracts, pending, activeWithoutContract, activeWithoutPlaylist };
}
