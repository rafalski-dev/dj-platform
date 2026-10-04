import { db } from "@/lib/db";

async function main() {
  const result = await db.event.deleteMany();

  console.log(result);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await db.$disconnect();
    process.exit(1);
  });
