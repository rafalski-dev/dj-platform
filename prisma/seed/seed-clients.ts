import { db } from "@/lib/db";
import { Gender } from "../../generated";

const clientsData: { name: string; gender: Gender; email?: string; phone?: string }[] = [
  { name: "Monika Rusin", gender: Gender.Female, email: "monikarusin@wp.pl", phone: "501858477" },
  { name: "Tomasz Nowicki", gender: Gender.Male, phone: "511123457" },
  {
    name: "Katarzyna Zając",
    gender: Gender.Female,
    phone: "731000000",
    email: "katarzyna.zajac@example.com",
  },
  {
    name: "Paweł Majewski",
    gender: Gender.Male,
    email: "pawel.majewski@example.com",
    phone: "785139295",
  },
  {
    name: "Agnieszka Wróbel",
    gender: Gender.Female,
    phone: "731137911",
    email: "agnieszka.wrobel@example.com",
  },
  {
    name: "Michał Pawlak",
    gender: Gender.Male,
    email: "michal.pawlak@example.com",
    phone: "559155133",
  },
  {
    name: "Joanna Kaczmarek",
    gender: Gender.Female,
    email: "joanna.kaczmarek@example.com",
    phone: "664318204",
  },
  { name: "Krzysztof Sikora", gender: Gender.Male, phone: "733170971" },
  {
    name: "Natalia Baran",
    gender: Gender.Female,
    phone: "731275822",
    email: "natalia.baran@example.com",
  },
  {
    name: "Bartosz Szulc",
    gender: Gender.Male,
    email: "bartosz.szulc@example.com",
    phone: "507186809",
  },
  {
    name: "Karolina Wieczorek",
    gender: Gender.Female,
    phone: "731413733",
    email: "karolina.wieczorek@example.com",
  },
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
  {
    name: "Weronika Dudek",
    gender: Gender.Female,
    phone: "731551644",
    email: "weronika.dudek@example.com",
  },
  {
    name: "Kamil Mazur",
    gender: Gender.Male,
    email: "kamil.mazur@example.com",
    phone: "729234323",
  },
  {
    name: "Aleksandra Kubiak",
    gender: Gender.Female,
    phone: "731689555",
    email: "aleksandra.kubiak@example.com",
  },
  { name: "Jakub Wilk", gender: Gender.Male, phone: "503250161" },
  {
    name: "Patrycja Sobczak",
    gender: Gender.Female,
    phone: "731827466",
    email: "patrycja.sobczak@example.com",
  },
  {
    name: "Sebastian Czarnecki",
    gender: Gender.Male,
    email: "sebastian.czarnecki@example.com",
    phone: "777265999",
  },
  {
    name: "Julia Kołodziej",
    gender: Gender.Female,
    phone: "731965377",
    email: "julia.kolodziej@example.com",
  },
  { name: "Dawid Lis", gender: Gender.Male, email: "dawid.lis@example.com", phone: "551281837" },
  {
    name: "Zuzanna Michalska",
    gender: Gender.Female,
    email: "zuzanna.michalska@example.com",
    phone: "608923561",
  },
  { name: "Alex Nowak", gender: Gender.Other, phone: "725297675" },
  {
    name: "Anna Lewandowska",
    gender: Gender.Female,
    email: "anna.lewandowska@example.com",
    phone: "602341778",
  },
  {
    name: "Marcin Kowalczyk",
    gender: Gender.Male,
    email: "marcin.kowalczyk@example.com",
    phone: "512908341",
  },
  {
    name: "Ewelina Grabowska",
    gender: Gender.Female,
    phone: "732103288",
    email: "ewelina.grabowska@example.com",
  },
  {
    name: "Piotr Zieliński",
    gender: Gender.Male,
    email: "piotr.zielinski@example.com",
    phone: "698117420",
  },
  {
    name: "Oliwia Szymańska",
    gender: Gender.Female,
    phone: "732241199",
    email: "oliwia.szymanska@example.com",
  },
  { name: "Grzegorz Wójcik", gender: Gender.Male, phone: "533472906" },
  {
    name: "Martyna Krawczyk",
    gender: Gender.Female,
    email: "martyna.krawczyk@example.com",
    phone: "791604215",
  },
  {
    name: "Robert Pietrzak",
    gender: Gender.Male,
    phone: "732379110",
    email: "robert.pietrzak@example.com",
  },
  {
    name: "Wiktoria Jabłońska",
    gender: Gender.Female,
    email: "wiktoria.jablonska@example.com",
    phone: "667350912",
  },
  {
    name: "Mateusz Król",
    gender: Gender.Male,
    email: "mateusz.krol@example.com",
    phone: "504786133",
  },
  { name: "Sam Kaczor", gender: Gender.Other, phone: "732517021", email: "sam.kaczor@example.com" },
  {
    name: "Alicja Nowak",
    gender: Gender.Female,
    email: "alicja.nowak@example.com",
    phone: "600104729",
  },
  { name: "Adam Wójcik", gender: Gender.Male, phone: "600209458" },
  {
    name: "Barbara Mazur",
    gender: Gender.Female,
    phone: "732654932",
    email: "barbara.mazur@example.com",
  },
  {
    name: "Bogdan Krawczyk",
    gender: Gender.Male,
    email: "bogdan.krawczyk@example.com",
    phone: "600314187",
  },
  {
    name: "Dominika Król",
    gender: Gender.Female,
    email: "dominika.krol@example.com",
    phone: "600418916",
  },
  {
    name: "Cezary Wieczorek",
    gender: Gender.Male,
    phone: "732792843",
    email: "cezary.wieczorek@example.com",
  },
  {
    name: "Emilia Kaczmarek",
    gender: Gender.Female,
    email: "emilia.kaczmarek@example.com",
    phone: "600523645",
  },
  { name: "Damian Pawlak", gender: Gender.Male, phone: "600628374" },
  {
    name: "Gabriela Michalak",
    gender: Gender.Female,
    phone: "732930754",
    email: "gabriela.michalak@example.com",
  },
  {
    name: "Emil Sikora",
    gender: Gender.Male,
    email: "emil.sikora@example.com",
    phone: "600733103",
  },
  {
    name: "Hanna Duda",
    gender: Gender.Female,
    email: "hanna.duda@example.com",
    phone: "600837832",
  },
  {
    name: "Filip Szewczyk",
    gender: Gender.Male,
    phone: "733068665",
    email: "filip.szewczyk@example.com",
  },
  { name: "Iga Sowa", gender: Gender.Female, email: "iga.sowa@example.com", phone: "600942561" },
  { name: "Hubert Kubiak", gender: Gender.Male, phone: "601047290" },
  {
    name: "Klaudia Wrona",
    gender: Gender.Female,
    phone: "733206576",
    email: "klaudia.wrona@example.com",
  },
  { name: "Igor Nowak", gender: Gender.Male, email: "igor.nowak@example.com", phone: "601152019" },
  {
    name: "Laura Wójcik",
    gender: Gender.Female,
    email: "laura.wojcik@example.com",
    phone: "601256748",
  },
  {
    name: "Konrad Mazur",
    gender: Gender.Male,
    phone: "733344487",
    email: "konrad.mazur@example.com",
  },
  {
    name: "Maja Krawczyk",
    gender: Gender.Female,
    email: "maja.krawczyk@example.com",
    phone: "601361477",
  },
  { name: "Leon Król", gender: Gender.Male, phone: "601466206" },
  {
    name: "Nina Wieczorek",
    gender: Gender.Female,
    phone: "733482398",
    email: "nina.wieczorek@example.com",
  },
  {
    name: "Mikołaj Kaczmarek",
    gender: Gender.Male,
    email: "mikolaj.kaczmarek@example.com",
    phone: "601570935",
  },
  {
    name: "Paulina Pawlak",
    gender: Gender.Female,
    email: "paulina.pawlak@example.com",
    phone: "601675664",
  },
  {
    name: "Oskar Michalak",
    gender: Gender.Male,
    phone: "733620309",
    email: "oskar.michalak@example.com",
  },
  {
    name: "Roksana Sikora",
    gender: Gender.Female,
    email: "roksana.sikora@example.com",
    phone: "601780393",
  },
  { name: "Rafał Duda", gender: Gender.Male, phone: "601885122" },
  {
    name: "Sylwia Szewczyk",
    gender: Gender.Female,
    phone: "733758220",
    email: "sylwia.szewczyk@example.com",
  },
  {
    name: "Szymon Sowa",
    gender: Gender.Male,
    email: "szymon.sowa@example.com",
    phone: "601989851",
  },
  {
    name: "Teresa Kubiak",
    gender: Gender.Female,
    email: "teresa.kubiak@example.com",
    phone: "602094580",
  },
  {
    name: "Tadeusz Wrona",
    gender: Gender.Male,
    phone: "733896131",
    email: "tadeusz.wrona@example.com",
  },
  {
    name: "Urszula Lis",
    gender: Gender.Female,
    email: "urszula.lis@example.com",
    phone: "602199309",
  },
  { name: "Wojciech Baran", gender: Gender.Male, phone: "602304038" },
  {
    name: "Zofia Wilk",
    gender: Gender.Female,
    phone: "734034042",
    email: "zofia.wilk@example.com",
  },
  {
    name: "Zbigniew Mazur",
    gender: Gender.Male,
    email: "zbigniew.mazur@example.com",
    phone: "602408767",
  },
  {
    name: "Ewa Kowalczyk",
    gender: Gender.Female,
    email: "ewa.kowalczyk@example.com",
    phone: "602513496",
  },
  { name: "Jan Zając", gender: Gender.Male, phone: "734171953", email: "jan.zajac@example.com" },
  {
    name: "Lena Dudek",
    gender: Gender.Female,
    email: "lena.dudek@example.com",
    phone: "602618225",
  },
  { name: "Antoni Sobczak", gender: Gender.Male, phone: "602722954" },
  {
    name: "Marta Jasińska",
    gender: Gender.Female,
    phone: "734309864",
    email: "marta.jasinska@example.com",
  },
  {
    name: "Stanisław Lis",
    gender: Gender.Male,
    email: "stanislaw.lis@example.com",
    phone: "602827683",
  },
  {
    name: "Kinga Czarnecka",
    gender: Gender.Female,
    email: "kinga.czarnecka@example.com",
    phone: "602932412",
  },
  {
    name: "Wiktor Majewski",
    gender: Gender.Male,
    phone: "734447775",
    email: "wiktor.majewski@example.com",
  },
  {
    name: "Daria Pietrzak",
    gender: Gender.Female,
    email: "daria.pietrzak@example.com",
    phone: "603037141",
  },
  { name: "Maksymilian Górski", gender: Gender.Male, phone: "603141870" },
  {
    name: "Robin Malinowski",
    gender: Gender.Other,
    phone: "734585686",
    email: "robin.malinowski@example.com",
  },
];

async function seedClient() {
  if (!process.env.DATABASE_URL?.includes("localhost")) {
    throw new Error("Script can't be run on production");
  }
  await db.client.deleteMany();

  // Każdy kolejny klient dodany tydzień wcześniej – stałe, powtarzalne daty
  const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const clientsWithDates = clientsData.map((client, index) => ({
    ...client,
    createdAt: new Date(Date.now() - index * WEEK_IN_MS),
  }));

  const clients = await db.client.createMany({ data: clientsWithDates });

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
