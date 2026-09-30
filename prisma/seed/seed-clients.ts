import { db } from "@/lib/db";
import { Gender } from "../../generated";

const clientsData: { name: string; gender: Gender; email?: string; phone?: string }[] = [
  { name: "Monika Rusin", gender: Gender.Female, email: "monikarusin@wp.pl", phone: "501858477" },
  { name: "Tomasz Nowicki", gender: Gender.Male, phone: "511123457" },
  { name: "Katarzyna Zając", gender: Gender.Female, email: "katarzyna.zajac@example.com" },
  {
    name: "Paweł Majewski",
    gender: Gender.Male,
    email: "pawel.majewski@example.com",
    phone: "785139295",
  },
  { name: "Agnieszka Wróbel", gender: Gender.Female, email: "agnieszka.wrobel@example.com" },
  { name: "Michał Pawlak", gender: Gender.Male, phone: "559155133" },
  {
    name: "Joanna Kaczmarek",
    gender: Gender.Female,
    email: "joanna.kaczmarek@example.com",
    phone: "664318204",
  },
  { name: "Krzysztof Sikora", gender: Gender.Male, phone: "733170971" },
  { name: "Natalia Baran", gender: Gender.Female, email: "natalia.baran@example.com" },
  { name: "Bartosz Szulc", gender: Gender.Male, phone: "507186809" },
  { name: "Karolina Wieczorek", gender: Gender.Female, email: "karolina.wieczorek@example.com" },
  {
    name: "Łukasz Górecki",
    gender: Gender.Male,
    email: "lukasz.gorecki@example.com",
    phone: "781202647",
  },
  {
    name: "Magdalena Adamczyk",
    gender: Gender.Female,
    email: "magdalena.adamczyk@example.com",
    phone: "692447015",
  },
  { name: "Adrian Jasiński", gender: Gender.Male, phone: "555218485" },
  { name: "Weronika Dudek", gender: Gender.Female, email: "weronika.dudek@example.com" },
  { name: "Kamil Mazur", gender: Gender.Male, phone: "729234323" },
  { name: "Aleksandra Kubiak", gender: Gender.Female, email: "aleksandra.kubiak@example.com" },
  { name: "Jakub Wilk", gender: Gender.Male, phone: "503250161" },
  { name: "Patrycja Sobczak", gender: Gender.Female, email: "patrycja.sobczak@example.com" },
  { name: "Sebastian Czarnecki", gender: Gender.Male, phone: "777265999" },
  { name: "Julia Kołodziej", gender: Gender.Female, email: "julia.kolodziej@example.com" },
  { name: "Dawid Lis", gender: Gender.Male, email: "dawid.lis@example.com", phone: "551281837" },
  {
    name: "Zuzanna Michalska",
    gender: Gender.Female,
    email: "zuzanna.michalska@example.com",
    phone: "608923561",
  },
  { name: "Alex Nowak", gender: Gender.Other, phone: "725297675" },
];

async function seedClient() {
  if (!process.env.DATABASE_URL?.includes("localhost")) {
    throw new Error("Script can't be run on production");
  }
  await db.client.deleteMany();

  const clients = await db.client.createMany({ data: clientsData });

  console.log(clients);
}

seedClient()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await db.$disconnect();
    process.exit(1);
  });
