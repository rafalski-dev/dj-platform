import { getClientsStats } from "@/data/clients";

import { cardsData } from "@/constants/admin";
import { CardsGroup } from "@/components/dashboards/shared/cardsGroup";

export async function ClientsStatsCards() {
  const stats = await getClientsStats();

  const cardsDataMapped = cardsData.map((el) => ({
    key: el.key,
    content: stats[el.key],
  }));

  return <CardsGroup data={cardsDataMapped} />;
}
