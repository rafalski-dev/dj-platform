import { db } from "@/lib/db";
import { ClientType, Gender, Prisma } from "../../generated";

const clientsData: {
  name: string;
  gender: Gender;
  idCardNumber: string;
  email?: string;
  phone?: string;
}[] = [
  {
    name: "Monika Rusin",
    gender: Gender.Female,
    idCardNumber: "DKQ 981399",
    email: "monikarusin@wp.pl",
    phone: "501858477",
  },
  { name: "Tomasz Nowicki", gender: Gender.Male, idCardNumber: "RNZ 198797", phone: "511123457" },
  {
    name: "Katarzyna Zając",
    gender: Gender.Female,
    idCardNumber: "HAT 011417",
    phone: "731000000",
    email: "katarzyna.zajac@example.com",
  },
  {
    name: "Paweł Majewski",
    gender: Gender.Male,
    idCardNumber: "AVP 153645",
    email: "pawel.majewski@example.com",
    phone: "785139295",
  },
  {
    name: "Agnieszka Wróbel",
    gender: Gender.Female,
    idCardNumber: "LZM 981518",
    phone: "731137911",
    email: "agnieszka.wrobel@example.com",
  },
  {
    name: "Michał Pawlak",
    gender: Gender.Male,
    idCardNumber: "RJJ 772940",
    email: "michal.pawlak@example.com",
    phone: "559155133",
  },
  {
    name: "Joanna Kaczmarek",
    gender: Gender.Female,
    idCardNumber: "WLL 576169",
    email: "joanna.kaczmarek@example.com",
    phone: "664318204",
  },
  { name: "Krzysztof Sikora", gender: Gender.Male, idCardNumber: "RPD 968976", phone: "733170971" },
  {
    name: "Natalia Baran",
    gender: Gender.Female,
    idCardNumber: "QIN 797880",
    phone: "731275822",
    email: "natalia.baran@example.com",
  },
  {
    name: "Bartosz Szulc",
    gender: Gender.Male,
    idCardNumber: "SHY 720819",
    email: "bartosz.szulc@example.com",
    phone: "507186809",
  },
  {
    name: "Karolina Wieczorek",
    gender: Gender.Female,
    idCardNumber: "NPE 973177",
    phone: "731413733",
    email: "karolina.wieczorek@example.com",
  },
  {
    name: "Łukasz Górecki",
    gender: Gender.Male,
    idCardNumber: "WRI 186488",
    email: "lukasz.gorecki@example.com",
    phone: "781202647",
  },
  {
    name: "Magdalena Adamczyk",
    gender: Gender.Female,
    idCardNumber: "WPZ 766344",
    email: "magdalena.adamczyk@example.com",
    phone: "692447015",
  },
  { name: "Adrian Jasiński", gender: Gender.Male, idCardNumber: "ABE 397875", phone: "555218485" },
  {
    name: "Weronika Dudek",
    gender: Gender.Female,
    idCardNumber: "GIW 377876",
    phone: "731551644",
    email: "weronika.dudek@example.com",
  },
  {
    name: "Kamil Mazur",
    gender: Gender.Male,
    idCardNumber: "RVB 145717",
    email: "kamil.mazur@example.com",
    phone: "729234323",
  },
  {
    name: "Aleksandra Kubiak",
    gender: Gender.Female,
    idCardNumber: "WWZ 284726",
    phone: "731689555",
    email: "aleksandra.kubiak@example.com",
  },
  { name: "Jakub Wilk", gender: Gender.Male, idCardNumber: "XPC 847513", phone: "503250161" },
  {
    name: "Patrycja Sobczak",
    gender: Gender.Female,
    idCardNumber: "XNE 570107",
    phone: "731827466",
    email: "patrycja.sobczak@example.com",
  },
  {
    name: "Sebastian Czarnecki",
    gender: Gender.Male,
    idCardNumber: "SRC 893319",
    email: "sebastian.czarnecki@example.com",
    phone: "777265999",
  },
  {
    name: "Julia Kołodziej",
    gender: Gender.Female,
    idCardNumber: "BYR 645205",
    phone: "731965377",
    email: "julia.kolodziej@example.com",
  },
  {
    name: "Dawid Lis",
    gender: Gender.Male,
    idCardNumber: "VSS 472837",
    email: "dawid.lis@example.com",
    phone: "551281837",
  },
  {
    name: "Zuzanna Michalska",
    gender: Gender.Female,
    idCardNumber: "SET 484162",
    email: "zuzanna.michalska@example.com",
    phone: "608923561",
  },
  { name: "Alex Nowak", gender: Gender.Other, idCardNumber: "EZZ 194866", phone: "725297675" },
  {
    name: "Anna Lewandowska",
    gender: Gender.Female,
    idCardNumber: "ZEQ 736016",
    email: "anna.lewandowska@example.com",
    phone: "602341778",
  },
  {
    name: "Marcin Kowalczyk",
    gender: Gender.Male,
    idCardNumber: "CBL 050087",
    email: "marcin.kowalczyk@example.com",
    phone: "512908341",
  },
  {
    name: "Ewelina Grabowska",
    gender: Gender.Female,
    idCardNumber: "KVJ 775177",
    phone: "732103288",
    email: "ewelina.grabowska@example.com",
  },
  {
    name: "Piotr Zieliński",
    gender: Gender.Male,
    idCardNumber: "STZ 222983",
    email: "piotr.zielinski@example.com",
    phone: "698117420",
  },
  {
    name: "Oliwia Szymańska",
    gender: Gender.Female,
    idCardNumber: "NTK 879318",
    phone: "732241199",
    email: "oliwia.szymanska@example.com",
  },
  { name: "Grzegorz Wójcik", gender: Gender.Male, idCardNumber: "MBG 620807", phone: "533472906" },
  {
    name: "Martyna Krawczyk",
    gender: Gender.Female,
    idCardNumber: "YUG 070283",
    email: "martyna.krawczyk@example.com",
    phone: "791604215",
  },
  {
    name: "Robert Pietrzak",
    gender: Gender.Male,
    idCardNumber: "ZQE 922646",
    phone: "732379110",
    email: "robert.pietrzak@example.com",
  },
  {
    name: "Wiktoria Jabłońska",
    gender: Gender.Female,
    idCardNumber: "RNC 764252",
    email: "wiktoria.jablonska@example.com",
    phone: "667350912",
  },
  {
    name: "Mateusz Król",
    gender: Gender.Male,
    idCardNumber: "IOP 364725",
    email: "mateusz.krol@example.com",
    phone: "504786133",
  },
  {
    name: "Sam Kaczor",
    gender: Gender.Other,
    idCardNumber: "QPO 118841",
    phone: "732517021",
    email: "sam.kaczor@example.com",
  },
  {
    name: "Alicja Nowak",
    gender: Gender.Female,
    idCardNumber: "GHA 217568",
    email: "alicja.nowak@example.com",
    phone: "600104729",
  },
  { name: "Adam Wójcik", gender: Gender.Male, idCardNumber: "ZVF 905258", phone: "600209458" },
  {
    name: "Barbara Mazur",
    gender: Gender.Female,
    idCardNumber: "VSZ 783194",
    phone: "732654932",
    email: "barbara.mazur@example.com",
  },
  {
    name: "Bogdan Krawczyk",
    gender: Gender.Male,
    idCardNumber: "RYS 639494",
    email: "bogdan.krawczyk@example.com",
    phone: "600314187",
  },
  {
    name: "Dominika Król",
    gender: Gender.Female,
    idCardNumber: "VRE 014162",
    email: "dominika.krol@example.com",
    phone: "600418916",
  },
  {
    name: "Cezary Wieczorek",
    gender: Gender.Male,
    idCardNumber: "DVB 852185",
    phone: "732792843",
    email: "cezary.wieczorek@example.com",
  },
  {
    name: "Emilia Kaczmarek",
    gender: Gender.Female,
    idCardNumber: "ISC 745244",
    email: "emilia.kaczmarek@example.com",
    phone: "600523645",
  },
  { name: "Damian Pawlak", gender: Gender.Male, idCardNumber: "CAN 646001", phone: "600628374" },
  {
    name: "Gabriela Michalak",
    gender: Gender.Female,
    idCardNumber: "HAJ 411895",
    phone: "732930754",
    email: "gabriela.michalak@example.com",
  },
  {
    name: "Emil Sikora",
    gender: Gender.Male,
    idCardNumber: "KYO 399065",
    email: "emil.sikora@example.com",
    phone: "600733103",
  },
  {
    name: "Hanna Duda",
    gender: Gender.Female,
    idCardNumber: "TGT 776158",
    email: "hanna.duda@example.com",
    phone: "600837832",
  },
  {
    name: "Filip Szewczyk",
    gender: Gender.Male,
    idCardNumber: "VIM 845060",
    phone: "733068665",
    email: "filip.szewczyk@example.com",
  },
  {
    name: "Iga Sowa",
    gender: Gender.Female,
    idCardNumber: "JWK 141465",
    email: "iga.sowa@example.com",
    phone: "600942561",
  },
  { name: "Hubert Kubiak", gender: Gender.Male, idCardNumber: "SAR 853801", phone: "601047290" },
  {
    name: "Klaudia Wrona",
    gender: Gender.Female,
    idCardNumber: "FTD 510285",
    phone: "733206576",
    email: "klaudia.wrona@example.com",
  },
  {
    name: "Igor Nowak",
    gender: Gender.Male,
    idCardNumber: "TUU 640692",
    email: "igor.nowak@example.com",
    phone: "601152019",
  },
  {
    name: "Laura Wójcik",
    gender: Gender.Female,
    idCardNumber: "LNM 263632",
    email: "laura.wojcik@example.com",
    phone: "601256748",
  },
  {
    name: "Konrad Mazur",
    gender: Gender.Male,
    idCardNumber: "FRA 688642",
    phone: "733344487",
    email: "konrad.mazur@example.com",
  },
  {
    name: "Maja Krawczyk",
    gender: Gender.Female,
    idCardNumber: "HAA 248764",
    email: "maja.krawczyk@example.com",
    phone: "601361477",
  },
  { name: "Leon Król", gender: Gender.Male, idCardNumber: "KEU 691280", phone: "601466206" },
  {
    name: "Nina Wieczorek",
    gender: Gender.Female,
    idCardNumber: "UQI 058500",
    phone: "733482398",
    email: "nina.wieczorek@example.com",
  },
  {
    name: "Mikołaj Kaczmarek",
    gender: Gender.Male,
    idCardNumber: "UHP 503826",
    email: "mikolaj.kaczmarek@example.com",
    phone: "601570935",
  },
  {
    name: "Paulina Pawlak",
    gender: Gender.Female,
    idCardNumber: "WLZ 538453",
    email: "paulina.pawlak@example.com",
    phone: "601675664",
  },
  {
    name: "Oskar Michalak",
    gender: Gender.Male,
    idCardNumber: "LLO 978794",
    phone: "733620309",
    email: "oskar.michalak@example.com",
  },
  {
    name: "Roksana Sikora",
    gender: Gender.Female,
    idCardNumber: "GFU 762705",
    email: "roksana.sikora@example.com",
    phone: "601780393",
  },
  { name: "Rafał Duda", gender: Gender.Male, idCardNumber: "QWN 102145", phone: "601885122" },
  {
    name: "Sylwia Szewczyk",
    gender: Gender.Female,
    idCardNumber: "RXI 821083",
    phone: "733758220",
    email: "sylwia.szewczyk@example.com",
  },
  {
    name: "Szymon Sowa",
    gender: Gender.Male,
    idCardNumber: "WSJ 290668",
    email: "szymon.sowa@example.com",
    phone: "601989851",
  },
  {
    name: "Teresa Kubiak",
    gender: Gender.Female,
    idCardNumber: "QZU 928112",
    email: "teresa.kubiak@example.com",
    phone: "602094580",
  },
  {
    name: "Tadeusz Wrona",
    gender: Gender.Male,
    idCardNumber: "XMK 684409",
    phone: "733896131",
    email: "tadeusz.wrona@example.com",
  },
  {
    name: "Urszula Lis",
    gender: Gender.Female,
    idCardNumber: "VZG 624484",
    email: "urszula.lis@example.com",
    phone: "602199309",
  },
  { name: "Wojciech Baran", gender: Gender.Male, idCardNumber: "LEM 830976", phone: "602304038" },
  {
    name: "Zofia Wilk",
    gender: Gender.Female,
    idCardNumber: "LZY 282802",
    phone: "734034042",
    email: "zofia.wilk@example.com",
  },
  {
    name: "Zbigniew Mazur",
    gender: Gender.Male,
    idCardNumber: "KRE 620180",
    email: "zbigniew.mazur@example.com",
    phone: "602408767",
  },
  {
    name: "Ewa Kowalczyk",
    gender: Gender.Female,
    idCardNumber: "LCL 043829",
    email: "ewa.kowalczyk@example.com",
    phone: "602513496",
  },
  {
    name: "Jan Zając",
    gender: Gender.Male,
    idCardNumber: "THE 715711",
    phone: "734171953",
    email: "jan.zajac@example.com",
  },
  {
    name: "Lena Dudek",
    gender: Gender.Female,
    idCardNumber: "MIT 341577",
    email: "lena.dudek@example.com",
    phone: "602618225",
  },
  { name: "Antoni Sobczak", gender: Gender.Male, idCardNumber: "DRQ 935795", phone: "602722954" },
  {
    name: "Marta Jasińska",
    gender: Gender.Female,
    idCardNumber: "CCY 317443",
    phone: "734309864",
    email: "marta.jasinska@example.com",
  },
  {
    name: "Stanisław Lis",
    gender: Gender.Male,
    idCardNumber: "FKN 988557",
    email: "stanislaw.lis@example.com",
    phone: "602827683",
  },
  {
    name: "Kinga Czarnecka",
    gender: Gender.Female,
    idCardNumber: "MKF 437355",
    email: "kinga.czarnecka@example.com",
    phone: "602932412",
  },
  {
    name: "Wiktor Majewski",
    gender: Gender.Male,
    idCardNumber: "NZS 363279",
    phone: "734447775",
    email: "wiktor.majewski@example.com",
  },
  {
    name: "Daria Pietrzak",
    gender: Gender.Female,
    idCardNumber: "VXE 164515",
    email: "daria.pietrzak@example.com",
    phone: "603037141",
  },
  {
    name: "Maksymilian Górski",
    gender: Gender.Male,
    idCardNumber: "IOI 428435",
    phone: "603141870",
  },
  {
    name: "Robin Malinowski",
    gender: Gender.Other,
    idCardNumber: "ERY 014497",
    phone: "734585686",
    email: "robin.malinowski@example.com",
  },
  {
    name: "Weronika Sadowska",
    gender: Gender.Female,
    idCardNumber: "WSA 448215",
    phone: "734721508",
    email: "weronika.sadowska@example.com",
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
  contact: { firstName: string; lastName: string };
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
