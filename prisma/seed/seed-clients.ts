import { db } from "@/lib/db";
import { ClientType, Gender, Prisma } from "../../generated";

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

const DEFAULT_REGION = "Małopolskie";
const DEFAULT_COUNTRY = "Polska";

type SeedAddress = {
  streetAndNumber: string;
  postcode: string;
  city: string;
  region?: string;
  country?: string;
};

// Ulice w okolicy Krakowa – tam, gdzie odbywają się wydarzenia z seed-events
const STREETS: { street: string; postcode: string; city: string; flat?: boolean }[] = [
  { street: "ul. Długa", postcode: "31-146", city: "Kraków", flat: true },
  { street: "ul. Karmelicka", postcode: "31-128", city: "Kraków", flat: true },
  { street: "ul. Starowiślna", postcode: "31-038", city: "Kraków", flat: true },
  { street: "ul. Kalwaryjska", postcode: "30-504", city: "Kraków", flat: true },
  { street: "ul. Wielicka", postcode: "30-552", city: "Kraków", flat: true },
  { street: "ul. Zakopiańska", postcode: "30-418", city: "Kraków", flat: true },
  { street: "ul. Kapelanka", postcode: "30-347", city: "Kraków", flat: true },
  { street: "ul. Lea", postcode: "30-048", city: "Kraków", flat: true },
  { street: "ul. Dobrego Pasterza", postcode: "31-416", city: "Kraków", flat: true },
  { street: "os. Oświecenia", postcode: "31-636", city: "Kraków", flat: true },
  { street: "ul. Bora-Komorowskiego", postcode: "31-476", city: "Kraków", flat: true },
  { street: "ul. Królewska", postcode: "30-045", city: "Kraków", flat: true },
  { street: "ul. Słowackiego", postcode: "32-020", city: "Wieliczka" },
  { street: "ul. Asnyka", postcode: "32-020", city: "Wieliczka" },
  { street: "ul. Mickiewicza", postcode: "32-050", city: "Skawina" },
  { street: "ul. Kościuszki", postcode: "32-005", city: "Niepołomice" },
  { street: "ul. Krakowska", postcode: "32-080", city: "Zabierzów" },
  { street: "ul. Galicyjska", postcode: "32-087", city: "Zielonki" },
  { street: "ul. Jagiellońska", postcode: "32-400", city: "Myślenice" },
  { street: "ul. Głowackiego", postcode: "32-800", city: "Brzesko" },
];

// Deterministyczny adres dla klienta o danym indeksie – te same dane przy każdym seedzie
function individualAddress(index: number): SeedAddress {
  const { street, postcode, city, flat } = STREETS[(index * 7) % STREETS.length];
  const houseNumber = ((index * 13) % 89) + 1;
  const apartment = flat ? `/${((index * 5) % 36) + 1}` : "";

  return {
    streetAndNumber: `${street} ${houseNumber}${apartment}`,
    postcode,
    city,
    region: DEFAULT_REGION,
    country: DEFAULT_COUNTRY,
  };
}

type BusinessSeed = {
  businessName: string;
  taxId: string;
  email?: string;
  phone?: string;
  // osoba kontaktowa – zapisywana w firstName / lastName
  contact: { firstName: string; lastName: string };
  // region i country domyślnie: Małopolskie, Polska
  address: SeedAddress;
};

const businessClientsData: BusinessSeed[] = [
  {
    businessName: "Panorama Group",
    taxId: "6762458315",
    email: "events@panorama-group.example.com",
    phone: "126543210",
    contact: { firstName: "Ewa", lastName: "Lisowska" },
    address: { streetAndNumber: "ul. Opolska 14", postcode: "31-323", city: "Kraków" },
  },
  {
    businessName: "Mazur Logistics",
    taxId: "6793108272",
    email: "biuro@mazur-logistics.example.com",
    phone: "124445566",
    contact: { firstName: "Marek", lastName: "Zawadzki" },
    address: { streetAndNumber: "ul. Półłanki 82", postcode: "30-740", city: "Kraków" },
  },
  {
    businessName: "Młyn Events",
    taxId: "9452219836",
    email: "kontakt@mlyn-events.example.com",
    phone: "123339911",
    contact: { firstName: "Agata", lastName: "Ostrowska" },
    address: { streetAndNumber: "ul. Młyńska 3", postcode: "32-080", city: "Zabierzów" },
  },
  {
    businessName: "TechConf Polska",
    taxId: "5252708149",
    email: "hello@techconf.example.com",
    phone: "222111333",
    contact: { firstName: "Piotr", lastName: "Kurek" },
    address: {
      streetAndNumber: "ul. Prosta 51",
      postcode: "00-838",
      city: "Warszawa",
      region: "Mazowieckie",
    },
  },
  {
    businessName: "Miejski Ośrodek Kultury",
    taxId: "6815502735",
    email: "mok@example.com",
    phone: "122224455",
    contact: { firstName: "Renata", lastName: "Bielecka" },
    address: { streetAndNumber: "Rynek 26", postcode: "32-400", city: "Myślenice" },
  },
  {
    businessName: "Hotel Srebrny Kłos",
    taxId: "6760012348",
    email: "rezerwacje@srebrny-klos.example.com",
    phone: "124118520",
    contact: { firstName: "Tomasz", lastName: "Głowacki" },
    address: { streetAndNumber: "ul. Zakopiańska 105", postcode: "30-435", city: "Kraków" },
  },
  {
    businessName: "Dwór Pod Lipami",
    taxId: "9451182769",
    email: "wesela@dwor-pod-lipami.example.com",
    phone: "600214587",
    contact: { firstName: "Izabela", lastName: "Wróblewska" },
    address: { streetAndNumber: "ul. Lipowa 8", postcode: "32-087", city: "Zielonki" },
  },
  {
    businessName: "Restauracja Stara Kuźnia",
    taxId: "6832045192",
    email: "kontakt@stara-kuznia.example.com",
    phone: "122783410",
    contact: { firstName: "Krzysztof", lastName: "Malec" },
    address: { streetAndNumber: "ul. Daniłowicza 9", postcode: "32-020", city: "Wieliczka" },
  },
  {
    businessName: "Zespół Szkół Ogólnokształcących nr 2",
    taxId: "6772190340",
    email: "sekretariat@zso2-skawina.example.com",
    phone: "122721845",
    contact: { firstName: "Joanna", lastName: "Rybak" },
    address: { streetAndNumber: "ul. Szkolna 4", postcode: "32-050", city: "Skawina" },
  },
  {
    businessName: "Zwinny Kod Sp. z o.o.",
    taxId: "6794021863",
    email: "people@zwinny-kod.example.com",
    phone: "512903664",
    contact: { firstName: "Łucja", lastName: "Stępień" },
    address: { streetAndNumber: "ul. Lubicz 23", postcode: "31-503", city: "Kraków" },
  },
  {
    businessName: "Fundacja Dźwięki Lata",
    taxId: "9443175281",
    email: "fundacja@dzwieki-lata.example.com",
    phone: "698120447",
    contact: { firstName: "Marcin", lastName: "Domański" },
    address: { streetAndNumber: "ul. Kościuszki 31", postcode: "32-005", city: "Niepołomice" },
  },
  {
    businessName: "Agencja Eventowa Iskra",
    taxId: "6768801429",
    email: "biuro@iskra-eventy.example.com",
    phone: "607551230",
    contact: { firstName: "Beata", lastName: "Kozłowska" },
    address: { streetAndNumber: "ul. Kalwaryjska 69", postcode: "30-504", city: "Kraków" },
  },
];

async function seedClient() {
  if (!process.env.DATABASE_URL?.includes("localhost")) {
    throw new Error("Script can't be run on production");
  }
  await db.contract.deleteMany();
  await db.playlist.deleteMany();
  await db.event.deleteMany();
  await db.client.deleteMany();

  // Każdy kolejny klient dodany tydzień wcześniej – stałe, powtarzalne daty
  const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const individualClients: Prisma.ClientCreateManyInput[] = clientsData.map(
    ({ name, ...client }, index) => {
      const [firstName, ...lastName] = name.split(" ");
      return {
        ...client,
        ...individualAddress(index),
        clientType: ClientType.Individual,
        name,
        firstName,
        lastName: lastName.join(" "),
      };
    },
  );

  const businessClients: Prisma.ClientCreateManyInput[] = businessClientsData.map(
    ({ businessName, contact, address, ...client }) => ({
      ...client,
      ...contact,
      region: DEFAULT_REGION,
      country: DEFAULT_COUNTRY,
      ...address,
      clientType: ClientType.Business,
      name: businessName,
      businessName,
    }),
  );

  const clientsWithDates = [...individualClients, ...businessClients].map((client, index) => ({
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
