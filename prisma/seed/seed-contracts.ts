import { db } from "@/lib/db";

export async function seedContracts() {
  if (!process.env.DATABASE_URL?.includes("localhost")) {
    throw new Error("Process can't be run on production");
  }
  const events = await db.event.findMany({ select: { id: true } });

  const mappedId = events.map((_, index) => {
    return { eventId: events[index].id };
  });

  await db.$executeRaw`TRUNCATE TABLE "contract" RESTART IDENTITY`;

  await db.contract.createMany({ data: mappedId });

  const updatedCount = await db.$executeRaw`
  UPDATE "contract"
  SET "contractNumber" = 'NC/' || EXTRACT(YEAR FROM "createdAt") || '/' || LPAD("number"::text, 4, '0')
`;

  console.log(updatedCount);
}

seedContracts()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
