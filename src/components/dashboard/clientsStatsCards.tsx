import { getClientsStats } from "@/data/clients";
import { CardsList } from "./cardsList";
import { cardsData } from "@/constants/admin";

export async function ClientsStatsCards() {
  const stats = await getClientsStats();

  const cardsDataMapped = cardsData.map((el) => ({
    key: el.key,
    content: stats[el.key],
  }));

  return <CardsList data={cardsDataMapped} />;
}
