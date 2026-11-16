import { db } from "@/lib/db";

export async function seedContracts() {
  if (!process.env.DATABASE_URL?.includes("localhost")) {
    throw new Error("Process can't be run on production");
  }
  const allEvents = await db.event.findMany({ select: { id: true, clientId: true } });

  // The first 3 clients with events get no contracts, so the "create contract" form has data
  const clientsWithoutContract = [...new Set(allEvents.map((event) => event.clientId))].slice(0, 3);
  const events = allEvents.filter((event) => !clientsWithoutContract.includes(event.clientId));

  const statuses = ["Draft", "Sent", "Signed", "Accepted", "Cancelled"] as const;

  const mappedId = events.map((_, index) => {
    return { eventId: events[index].id, status: statuses[index % statuses.length] };
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
