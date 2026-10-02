import { db } from "@/lib/db";
import { EventStatus, EventType } from "../../generated";

const eventsData = [
  {
    clientName: "Monika Rusin",
    date: new Date("12-12-2026"),
    startTime: "15:00",
    endTime: "03:00",
    place: "Zajazd pod gruszą",
    title: "Wesele Moniki & Adama",
    guestCount: 150,
    partner1Name: "Monika Rusin",
    partner2Name: "Jakub Domański",
    type: EventType.Wedding,
  },
  {
    clientName: "Magdalena Adamczyk",
    date: new Date("2026-05-23"),
    startTime: "16:00",
    endTime: "04:00",
    place: "Dwór Pod Lipami, Niepołomice",
    title: "Wesele Magdaleny & Piotra",
    guestCount: 130,
    phone: "692447015",
    partner1Name: "Magdalena Adamczyk",
    partner2Name: "Piotr Lewandowski",
    notes: "Pierwszy taniec: walc angielski. Oczepiny o północy.",
    type: EventType.Wedding,
    status: EventStatus.Fulfilled,
  },
  {
    clientName: "Katarzyna Zając",
    date: new Date("2026-06-20"),
    startTime: "17:00",
    endTime: "03:00",
    place: "Stara Stodoła, Zabierzów",
    title: "Wesele Katarzyny & Michała",
    guestCount: 90,
    partner1Name: "Katarzyna Zając",
    partner2Name: "Michał Kowalczyk",
    type: EventType.Wedding,
    status: EventStatus.Fulfilled,
  },
  {
    clientName: "Łukasz Górecki",
    date: new Date("2026-07-18"),
    endTime: "00:00",
    place: "Restauracja Nad Stawem",
    title: "25. rocznica ślubu Góreckich",
    partner1Name: "Ewa Górecka",
    partner2Name: "Marek Górecki",
    type: EventType.Anniversary,
    status: EventStatus.Fulfilled,
  },
  {
    clientName: "Joanna Kaczmarek",
    date: new Date("2026-08-29"),
    startTime: "18:00",
    endTime: "02:00",
    place: "Klub Piwnica, Kraków",
    title: "18. urodziny Oli",
    guestCount: 45,
    phone: "664318204",
    notes: "Bez disco polo. Dużo muzyki z lat 2000.",
    type: EventType.Birthday_18,
    status: EventStatus.Fulfilled,
  },
  {
    clientName: "Krzysztof Sikora",
    date: new Date("2026-09-05"),
    startTime: "20:00",
    endTime: "23:30",
    place: "Rynek, scena plenerowa",
    title: "Dni Miasta - scena taneczna",
    phone: "733170971",
    notes: "Odwołane przez organizatora z powodu pogody.",
    type: EventType.Festival,
    status: EventStatus.Cancelled,
  },
  {
    clientName: "Paweł Majewski",
    date: new Date("2026-09-11"),
    startTime: "19:00",
    endTime: "01:00",
    place: "Hotel Panorama, sala bankietowa",
    title: "Jubileusz 10-lecia firmy",
    guestCount: 80,
    type: EventType.Corporate_Event,
    status: EventStatus.Fulfilled,
  },
  {
    clientName: "Dawid Lis",
    date: new Date("2026-11-06"),
    startTime: "09:00",
    endTime: "17:00",
    place: "Centrum Konferencyjne Młyn",
    title: "Konferencja branżowa - oprawa muzyczna",
    phone: "551281837",
    notes: "Potrzebne 2 mikrofony bezprzewodowe i nagłośnienie sali.",
    type: EventType.Conference,
    status: EventStatus.Confirmed,
  },
  {
    clientName: "Alex Nowak",
    date: new Date("2026-11-28"),
    startTime: "20:00",
    endTime: "03:00",
    place: "Klub Piwnica, Kraków",
    title: "Impreza andrzejkowa",
    guestCount: 60,
    type: EventType.Other,
    status: EventStatus.Confirmed,
  },
  {
    clientName: "Paweł Majewski",
    date: new Date("2026-12-18"),
    startTime: "18:00",
    endTime: "00:00",
    place: "Hotel Panorama, sala bankietowa",
    title: "Wigilia firmowa",
    guestCount: 120,
    notes: "Pierwsza godzina tylko kolędy i muzyka w tle.",
    type: EventType.Corporate_Event,
    status: EventStatus.Confirmed,
  },
  {
    clientName: "Natalia Baran",
    date: new Date("2027-01-23"),
    startTime: "19:00",
    endTime: "04:00",
    place: "Dwór Pod Lipami, Niepołomice",
    title: "Studniówka klas maturalnych",
    guestCount: 220,
    notes: "Polonez o 19:30 - własne nagranie od szkoły.",
    type: EventType.Prom,
    status: EventStatus.Confirmed,
  },
  {
    clientName: "Aleksandra Kubiak",
    date: new Date("2027-03-06"),
    endTime: "01:00",
    place: "Restauracja Nad Stawem",
    title: "18. urodziny Aleksandry",
    guestCount: 30,
    type: EventType.Birthday_18,
  },
  {
    clientName: "Zuzanna Michalska",
    date: new Date("2027-06-19"),
    startTime: "16:30",
    endTime: "04:00",
    place: "Stara Stodoła, Zabierzów",
    title: "Wesele Zuzanny & Kacpra",
    guestCount: 140,
    phone: "608923561",
    partner1Name: "Zuzanna Michalska",
    partner2Name: "Kacper Zieliński",
    type: EventType.Wedding,
    status: EventStatus.Confirmed,
  },
  {
    clientName: "Agnieszka Wróbel",
    date: new Date("2027-08-21"),
    endTime: "04:00",
    place: "Do ustalenia",
    title: "Wesele Agnieszki",
    partner1Name: "Agnieszka Wróbel",
    type: EventType.Wedding,
  },
  {
    clientName: "Karolina Wieczorek",
    date: new Date("2027-09-11"),
    endTime: "03:00",
    place: "Pałacyk Leśny",
    title: "Wesele Karoliny & Marcina",
    partner1Name: "Karolina Wieczorek",
    partner2Name: "Marcin Pietrzak",
    type: EventType.Wedding,
    status: EventStatus.Confirmed,
  },
];

async function seedingEventsData() {
  if (!process.env.DATABASE_URL?.includes("localhost")) {
    throw new Error("Process can't be run on production");
  }

  const clients = await db.client.findMany({ select: { id: true, name: true } });

  const eventsDataWithClientId = eventsData.map(({ clientName, ...event }) => {
    const client = clients.find((el) => el.name === clientName);

    if (!client) {
      throw new Error(`Client "${clientName}" not found`);
    }

    return { ...event, clientId: client.id };
  });

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
