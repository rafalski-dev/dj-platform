import { getClientsStats } from "@/data/clients";
import { CardsList } from "./cardsList";
import { getCurrentYear } from "@/lib/utils";

export async function ClientsStatsCards() {
  const stats = await getClientsStats();
  const cardsData = [
    {
      header: "New this season",
      content: stats.newThisSeason,
      footer: `season ${getCurrentYear()}`,
    },
    { header: "Active clients", content: stats.activeClients, footer: "with upcoming event" },
    { header: "Without event", content: stats.withoutEvent, footer: "no event booked yet" },
    { header: "Needs attention", content: stats.needsAttention, footer: "missing email or phone" },
  ];
  return <CardsList localData={cardsData} />;
}
