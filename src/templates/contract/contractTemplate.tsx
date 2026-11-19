import type { BusinessDetails, Client, Event } from "../../../generated";
import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import path from "node:path";

// The built-in PDF fonts have no Polish letters (ą, ę, ł...), so we register our own.
Font.register({
  family: "NotoSans",
  fonts: [
    { src: path.join(process.cwd(), "src/templates/contract/fonts/NotoSans-Regular.ttf") },
    {
      src: path.join(process.cwd(), "src/templates/contract/fonts/NotoSans-Bold.ttf"),
      fontWeight: "bold",
    },
  ],
});

// Keep whole words on one line (no "By-dgoszcz").
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    paddingVertical: 32,
    paddingHorizontal: 48,
    fontFamily: "NotoSans",
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#18181b",
  },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 14 },
  section: { fontWeight: "bold", textAlign: "center", marginTop: 6, marginBottom: 1 },
  paragraph: { textAlign: "justify" },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
    paddingHorizontal: 24,
    fontWeight: "bold",
  },
});

type ContractTemplateProps = {
  signedAt: Date;
  client: Client;
  performer: BusinessDetails;
  // hours are checked before rendering (lib/contractPdf), so here they're always set
  event: Pick<Event, "type" | "altType" | "place" | "address"> & { startsAt: Date; endsAt: Date };
};

const TIME_ZONE = "Europe/Warsaw";

const eventTypeLabels: Record<Event["type"], string> = {
  Wedding: "Wesele",
  Prom: "Studniówka",
  Anniversary: "Rocznica",
  Birthday_18: "18-nastka",
  Conference: "Konferencja",
  Corporate_Event: "Impreza firmowa",
  Festival: "Festiwal",
  Other: "Impreza",
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("pl-PL", {
    timeZone: TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat("pl-PL", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

const joinParts = (parts: (string | null | undefined)[], separator = ", ") =>
  parts.filter(Boolean).join(separator);

export function ContractTemplate({ signedAt, client, performer, event }: ContractTemplateProps) {
  const clientAddress = joinParts([
    client.streetAndNumber,
    joinParts([client.postcode, client.city], " "),
  ]);
  const performerAddress = joinParts([
    performer.streetAndNumber,
    joinParts([performer.postcode, performer.city], " "),
  ]);
  const living = client.gender === "Female" ? "zamieszkała" : "zamieszkały";
  const eventLabel =
    event.type === "Other" && event.altType ? event.altType : eventTypeLabels[event.type];
  const clientName =
    client.clientType === "Business"
      ? joinParts([client.businessName ?? client.name, client.taxId && `NIP ${client.taxId}`])
      : `${client.firstName} ${client.lastName}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Umowa</Text>

        <Text style={styles.paragraph}>
          Zawarta w dniu {formatDate(signedAt)}
          {performer.city ? `, miejscowość: ${performer.city}` : ""}, pomiędzy: {clientName}
          {clientAddress ? `, ${living}: ${clientAddress}` : ""}
          {client.phone ? ` (telefon kontaktowy ${client.phone})` : ""}, zwanym dalej Zamawiającym,
          a {performer.firstName} {performer.lastName}
          {performer.phone ? ` (tel. ${performer.phone})` : ""}
          {performerAddress ? `, zamieszkałym: ${performerAddress}` : ""}, zwanym dalej Wykonawcą.
        </Text>

        <Text style={styles.section}>§ 1</Text>
        <Text style={styles.paragraph}>
          Zamawiający zleca, a Wykonawca zobowiązuje się do obsługi muzycznej: {eventLabel},
          organizowanej przez Zamawiającego od godziny {formatTime(event.startsAt)} w dniu{" "}
          {formatDate(event.startsAt)} r. do godziny {formatTime(event.endsAt)} w dniu{" "}
          {formatDate(event.endsAt)} r. w lokalu: {joinParts([event.place, event.address])}.
        </Text>

        <Text style={styles.section}>§ 2</Text>
        <Text style={styles.paragraph}>
          Za wyżej wymienioną usługę Zamawiający zapłaci Wykonawcy kwotę ........... zł (słownie
          ...........................). Wynagrodzenie za każdą rozpoczętą godzinę ponad czas zawarty
          w umowie wynosi ........... zł (słownie ...........................).
        </Text>

        <Text style={styles.section}>§ 3</Text>
        <Text style={styles.paragraph}>
          Zapłata wynagrodzenia nastąpi w dniu imprezy, po jej zakończeniu.
        </Text>

        <Text style={styles.section}>§ 4</Text>
        <Text style={styles.paragraph}>
          Wykonawca jest zobowiązany do poprowadzenia imprezy na uzgodnionym poziomie, wg przyjętych
          norm i standardów oraz według uzgodnionego ustnie planu.
        </Text>

        <Text style={styles.section}>§ 5</Text>
        <Text style={styles.paragraph}>
          1. Wykonawca zapewnia ze swojej strony profesjonalny sprzęt audio, oświetlenie
          dyskotekowe, bogatą dyskografię.
        </Text>
        <Text style={styles.paragraph}>
          2. Wykonawca zapewnia na własny koszt i ryzyko transport sprzętu potrzebnego do wywiązania
          się z umowy.
        </Text>

        <Text style={styles.section}>§ 6</Text>
        <Text style={styles.paragraph}>
          Wykonawca zobowiązuje się do wyznaczenia osoby zastępczej do poprowadzenia imprezy w razie
          zaistnienia zdarzeń losowych uniemożliwiających mu wywiązanie się z umowy.
        </Text>

        <Text style={styles.section}>§ 7</Text>
        <Text style={styles.paragraph}>
          W przypadku odstąpienia od umowy przez Zamawiającego w trakcie wykonywania przez Wykonawcę
          umowy, Wykonawca zachowuje prawo do pełnego wynagrodzenia, określonego w §2.
        </Text>

        <Text style={styles.section}>§ 8</Text>
        <Text style={styles.paragraph}>
          Zamawiający zobowiązuje się do zapewnienia Wykonawcy możliwości podłączenia niezbędnego
          sprzętu i urządzeń nagłaśniających.
        </Text>

        <Text style={styles.section}>§ 9</Text>
        <Text style={styles.paragraph}>
          Zamawiający ponosi odpowiedzialność materialną za zniszczenie lub uszkodzenie sprzętu
          powstałe z winy osób nie będących członkami zespołu Wykonawcy.
        </Text>

        <Text style={styles.section}>§ 10</Text>
        <Text style={styles.paragraph}>
          Brak prądu oraz inne przeszkody powodujące przerwy w obsłudze muzycznej imprezy bądź
          całkowity brak możliwości wykonania usługi, nie wynikające z winy Wykonawcy nie stanowią
          podstawy do przedłużania czasu jej trwania ponad czas określony oraz nie stanowią podstawy
          do braku zapłaty wynagrodzenia określonego w § 2 niniejszej umowy.
        </Text>

        <Text style={styles.section}>§ 11</Text>
        <Text style={styles.paragraph}>
          Opłaty wynikające z kosztów licencji na publiczne wykonywanie utworów ponosi Zamawiający.
        </Text>

        <Text style={styles.section}>§ 12</Text>
        <Text style={styles.paragraph}>
          Strony oświadczają, że wszelkie ewentualne spory wynikające z realizacji postanowień umowy
          będą starały się rozwiązać polubownie. W przypadku nieosiągnięcia porozumienia, właściwym
          dla rozstrzygnięcia sporu będzie sąd powszechny właściwy dla Zamawiającego.
        </Text>

        <Text style={styles.section}>§ 13</Text>
        <Text style={styles.paragraph}>
          Umowę sporządzono w dwóch jednobrzmiących egzemplarzach po jednym dla każdej ze stron.
        </Text>

        <View style={styles.signatures}>
          <Text>ZAMAWIAJĄCY</Text>
          <Text>WYKONAWCA</Text>
        </View>
      </Page>
    </Document>
  );
}
