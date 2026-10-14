import { db } from "@/lib/db";
import { EventStatus, EventType, Prisma } from "../../generated";
import { toEventDates } from "@/lib/eventDates";

type SeedEvent = {
  clientName: string;
  date: string;
  startTime?: string;
  endTime?: string;
  eventPlace: string;
  city: string;
  title: string;
  guestCount?: number;
  notes?: string;
  partner1Name?: string;
  partner2Name?: string;
  eventType: EventType;
  eventStatus?: EventStatus;
};

const eventsData: SeedEvent[] = [
  {
    clientName: "Monika Rusin",
    date: "2026-12-12",
    startTime: "15:00",
    endTime: "03:00",
    eventPlace: "Zajazd pod gruszą",
    city: "Wieliczka",
    title: "Wesele Moniki & Adama",
    guestCount: 150,
    partner1Name: "Monika Rusin",
    partner2Name: "Jakub Domański",
    eventType: EventType.Wedding,
  },
  {
    clientName: "Magdalena Adamczyk",
    date: "2026-05-23",
    startTime: "16:00",
    endTime: "04:00",
    eventPlace: "Dwór Pod Lipami",
    city: "Niepołomice",
    title: "Wesele Magdaleny & Piotra",
    guestCount: 130,
    partner1Name: "Magdalena Adamczyk",
    partner2Name: "Piotr Lewandowski",
    notes: "Pierwszy taniec: walc angielski. Oczepiny o północy.",
    eventType: EventType.Wedding,
    eventStatus: EventStatus.Completed,
  },
  {
    clientName: "Katarzyna Zając",
    date: "2026-06-20",
    startTime: "17:00",
    endTime: "03:00",
    eventPlace: "Stara Stodoła",
    city: "Zabierzów",
    title: "Wesele Katarzyny & Michała",
    guestCount: 90,
    partner1Name: "Katarzyna Zając",
    partner2Name: "Michał Kowalczyk",
    eventType: EventType.Wedding,
    eventStatus: EventStatus.Completed,
  },
  {
    clientName: "Łukasz Górecki",
    date: "2026-07-18",
    endTime: "00:00",
    eventPlace: "Restauracja Nad Stawem",
    city: "Skawina",
    title: "25. rocznica ślubu Góreckich",
    partner1Name: "Ewa Górecka",
    partner2Name: "Marek Górecki",
    eventType: EventType.Anniversary,
    eventStatus: EventStatus.Completed,
  },
  {
    clientName: "Joanna Kaczmarek",
    date: "2026-08-29",
    startTime: "18:00",
    endTime: "02:00",
    eventPlace: "Klub Piwnica",
    city: "Kraków",
    title: "18. urodziny Oli",
    guestCount: 45,
    notes: "Bez disco polo. Dużo muzyki z lat 2000.",
    eventType: EventType.Birthday_18,
    eventStatus: EventStatus.Completed,
  },
  {
    clientName: "Miejski Ośrodek Kultury",
    date: "2026-09-05",
    startTime: "20:00",
    endTime: "23:30",
    eventPlace: "Rynek, scena plenerowa",
    city: "Myślenice",
    title: "Dni Miasta - scena taneczna",
    notes: "Odwołane przez organizatora z powodu pogody.",
    eventType: EventType.Festival,
    eventStatus: EventStatus.Cancelled,
  },
  {
    clientName: "Panorama Group",
    date: "2026-09-11",
    startTime: "19:00",
    endTime: "01:00",
    eventPlace: "Hotel Panorama, sala bankietowa",
    city: "Kraków",
    title: "Jubileusz 10-lecia firmy",
    guestCount: 80,
    eventType: EventType.Corporate_Event,
    eventStatus: EventStatus.Completed,
  },
  {
    clientName: "Młyn Events",
    date: "2026-11-06",
    startTime: "09:00",
    endTime: "17:00",
    eventPlace: "Centrum Konferencyjne Młyn",
    city: "Kraków",
    title: "Konferencja branżowa - oprawa muzyczna",
    notes: "Potrzebne 2 mikrofony bezprzewodowe i nagłośnienie sali.",
    eventType: EventType.Conference,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Alex Nowak",
    date: "2026-11-28",
    startTime: "20:00",
    endTime: "03:00",
    eventPlace: "Klub Piwnica",
    city: "Kraków",
    title: "Impreza andrzejkowa",
    guestCount: 60,
    eventType: EventType.Other,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Panorama Group",
    date: "2026-12-18",
    startTime: "18:00",
    endTime: "00:00",
    eventPlace: "Hotel Panorama, sala bankietowa",
    city: "Kraków",
    title: "Wigilia firmowa",
    guestCount: 120,
    notes: "Pierwsza godzina tylko kolędy i muzyka w tle.",
    eventType: EventType.Corporate_Event,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Natalia Baran",
    date: "2027-01-23",
    startTime: "19:00",
    endTime: "04:00",
    eventPlace: "Dwór Pod Lipami",
    city: "Niepołomice",
    title: "Studniówka klas maturalnych",
    guestCount: 220,
    notes: "Polonez o 19:30 - własne nagranie od szkoły.",
    eventType: EventType.Prom,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Aleksandra Kubiak",
    date: "2027-03-06",
    endTime: "01:00",
    eventPlace: "Restauracja Nad Stawem",
    city: "Skawina",
    title: "18. urodziny Aleksandry",
    guestCount: 30,
    eventType: EventType.Birthday_18,
  },
  {
    clientName: "Zuzanna Michalska",
    date: "2027-06-19",
    startTime: "16:30",
    endTime: "04:00",
    eventPlace: "Stara Stodoła",
    city: "Zabierzów",
    title: "Wesele Zuzanny & Kacpra",
    guestCount: 140,
    partner1Name: "Zuzanna Michalska",
    partner2Name: "Kacper Zieliński",
    eventType: EventType.Wedding,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Agnieszka Wróbel",
    date: "2027-08-21",
    endTime: "04:00",
    eventPlace: "Do ustalenia",
    city: "Kraków",
    title: "Wesele Agnieszki",
    partner1Name: "Agnieszka Wróbel",
    eventType: EventType.Wedding,
  },
  {
    clientName: "Karolina Wieczorek",
    date: "2027-09-11",
    endTime: "03:00",
    eventPlace: "Pałacyk Leśny",
    city: "Wieliczka",
    title: "Wesele Karoliny & Marcina",
    partner1Name: "Karolina Wieczorek",
    partner2Name: "Marcin Pietrzak",
    eventType: EventType.Wedding,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Tomasz Nowicki",
    date: "2026-04-25",
    startTime: "16:00",
    endTime: "03:00",
    eventPlace: "Dwór Zieleniec",
    city: "Zielonki",
    title: "Wesele Tomasza & Ewy",
    guestCount: 110,
    partner1Name: "Ewa Malinowska",
    partner2Name: "Tomasz Nowicki",
    eventType: EventType.Wedding,
    eventStatus: EventStatus.Completed,
  },
  {
    clientName: "Weronika Dudek",
    date: "2026-05-09",
    startTime: "18:00",
    endTime: "01:00",
    eventPlace: "Klub Forty",
    city: "Kraków",
    title: "18. urodziny Weroniki",
    guestCount: 50,
    eventType: EventType.Birthday_18,
    eventStatus: EventStatus.Completed,
  },
  {
    clientName: "Michał Pawlak",
    date: "2026-06-06",
    startTime: "17:00",
    endTime: "04:00",
    eventPlace: "Pałac Goetz",
    city: "Brzesko",
    title: "Wesele Michała & Kingi",
    guestCount: 160,
    partner1Name: "Kinga Sowa",
    partner2Name: "Michał Pawlak",
    eventType: EventType.Wedding,
    eventStatus: EventStatus.Completed,
  },
  {
    clientName: "Sebastian Czarnecki",
    date: "2026-07-04",
    startTime: "19:00",
    endTime: "23:00",
    eventPlace: "Bulwary Wiślane, scena letnia",
    city: "Kraków",
    title: "Letni festiwal nad Wisłą",
    notes: "Set 120-128 BPM, house i nu-disco.",
    eventType: EventType.Festival,
    eventStatus: EventStatus.Completed,
  },
  {
    clientName: "Julia Kołodziej",
    date: "2026-08-15",
    startTime: "16:00",
    endTime: "03:00",
    eventPlace: "Zajazd pod gruszą",
    city: "Wieliczka",
    title: "Wesele Julii & Szymona",
    guestCount: 95,
    partner1Name: "Julia Kołodziej",
    partner2Name: "Szymon Sowa",
    eventType: EventType.Wedding,
    eventStatus: EventStatus.Cancelled,
    notes: "Para przełożyła ślub na kolejny rok.",
  },
  {
    clientName: "Anna Lewandowska",
    date: "2026-10-17",
    startTime: "19:00",
    endTime: "02:00",
    eventPlace: "Hotel Panorama, sala bankietowa",
    city: "Kraków",
    title: "40. urodziny Anny",
    guestCount: 70,
    eventType: EventType.Other,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "TechConf Polska",
    date: "2026-10-24",
    startTime: "09:00",
    endTime: "16:00",
    eventPlace: "ICE Kraków, sala B",
    city: "Kraków",
    title: "TechConf Polska - oprawa muzyczna",
    notes: "Muzyka w przerwach + intro prelegentów.",
    eventType: EventType.Conference,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Mazur Logistics",
    date: "2026-11-14",
    startTime: "20:00",
    endTime: "02:00",
    eventPlace: "Restauracja Wierzynek",
    city: "Kraków",
    title: "Impreza firmowa Mazur Logistics",
    guestCount: 85,
    eventType: EventType.Corporate_Event,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Martyna Krawczyk",
    date: "2027-01-16",
    startTime: "19:00",
    endTime: "04:00",
    eventPlace: "Pałacyk Leśny",
    city: "Wieliczka",
    title: "Studniówka II LO",
    guestCount: 180,
    eventType: EventType.Prom,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Magdalena Adamczyk",
    date: "2027-05-22",
    startTime: "18:00",
    endTime: "01:00",
    eventPlace: "Dwór Pod Lipami",
    city: "Niepołomice",
    title: "1. rocznica ślubu Magdaleny & Piotra",
    guestCount: 40,
    partner1Name: "Magdalena Adamczyk",
    partner2Name: "Piotr Lewandowski",
    eventType: EventType.Anniversary,
  },
  {
    clientName: "Mateusz Król",
    date: "2027-05-29",
    endTime: "04:00",
    eventPlace: "Do ustalenia",
    city: "Kraków",
    title: "Wesele Mateusza & Oliwii",
    partner1Name: "Oliwia Szymańska",
    partner2Name: "Mateusz Król",
    eventType: EventType.Wedding,
  },
  {
    clientName: "Emilia Kaczmarek",
    date: "2027-06-26",
    startTime: "16:00",
    endTime: "03:00",
    eventPlace: "Stara Stodoła",
    city: "Zabierzów",
    title: "Wesele Emilii & Adama",
    guestCount: 120,
    partner1Name: "Emilia Kaczmarek",
    partner2Name: "Adam Wójcik",
    eventType: EventType.Wedding,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Patrycja Sobczak",
    date: "2027-07-10",
    startTime: "18:00",
    endTime: "02:00",
    eventPlace: "Klub Piwnica",
    city: "Kraków",
    title: "18. urodziny Patrycji",
    guestCount: 40,
    eventType: EventType.Birthday_18,
  },
  {
    clientName: "Adrian Jasiński",
    date: "2027-08-07",
    startTime: "17:00",
    endTime: "04:00",
    eventPlace: "Dwór Zieleniec",
    city: "Zielonki",
    title: "Wesele Adriana & Moniki",
    guestCount: 150,
    partner1Name: "Monika Lis",
    partner2Name: "Adrian Jasiński",
    eventType: EventType.Wedding,
    eventStatus: EventStatus.Active,
  },
  {
    clientName: "Alicja Nowak",
    date: "2027-09-25",
    endTime: "00:00",
    eventPlace: "Restauracja Nad Stawem",
    city: "Skawina",
    title: "30. rocznica ślubu Nowaków",
    partner1Name: "Alicja Nowak",
    partner2Name: "Jerzy Nowak",
    eventType: EventType.Anniversary,
  },
];

async function seedingEventsData() {
  if (!process.env.DATABASE_URL?.includes("localhost")) {
    throw new Error("Process can't be run on production");
  }

  const clients = await db.client.findMany({ select: { id: true, name: true } });

  const eventsDataWithClientId: Prisma.EventCreateManyInput[] = eventsData.map(
    ({ clientName, date, startTime, endTime, partner1Name, partner2Name, ...event }) => {
      const client = clients.find((el) => el.name === clientName);

      if (!client) {
        throw new Error(`Client "${clientName}" not found`);
      }

      // the client is one of the partners, the other one is stored as secondPartnerName
      const partners = [partner1Name, partner2Name].filter((name) => name !== undefined);
      const secondPartnerName = partners.includes(clientName)
        ? (partners.find((name) => name !== clientName) ?? null)
        : null;

      return {
        ...event,
        ...toEventDates(date, startTime, endTime),
        secondPartnerName,
        clientId: client.id,
      };
    },
  );

  await db.contract.deleteMany();
  await db.playlist.deleteMany();
  await db.event.deleteMany();

  const events = await db.event.createMany({ data: eventsDataWithClientId });

  console.log(events);
}

seedingEventsData()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await db.$disconnect();
    process.exit(1);
  });
