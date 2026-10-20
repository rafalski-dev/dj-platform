import { db } from "@/lib/db";

export async function seedPlaylists() {
  if (!process.env.DATABASE_URL?.includes("localhost")) {
    throw new Error("Database can't be run on production");
  }

  await db.playlist.deleteMany();

  const events = await db.event.findMany({ select: { id: true } });

  const mappedEvents = events.map((_, index) => ({ eventId: events[index].id }));

  await db.playlist.createMany({ data: mappedEvents });

  const updatedCount = await db.$executeRaw`
  UPDATE "playlist" AS p
  SET "name" = REPLACE(e."eventType"::text, '_', ' ') || ' ' || TO_CHAR(e."eventDate", 'DD.MM.YYYY')
  FROM "event" AS e
  WHERE e."id" = p."eventId"
`;

  console.log(updatedCount);
}

seedPlaylists()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
