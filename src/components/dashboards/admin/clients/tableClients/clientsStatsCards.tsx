import { getTranslations } from "next-intl/server";
import { getClientsStats } from "@/data/clients";
import { cardsData } from "@/constants/admin";
import { getCurrentYear } from "@/lib/utils";
import { CardsGroup } from "@/components/dashboards/shared/cardsGroup";

export async function ClientsStatsCards() {
  const t = await getTranslations("Admin.Clients.stats");
  const stats = await getClientsStats();
  const year = getCurrentYear();

  const cards = cardsData.map(({ key }) => ({
    key,
    header: t(`${key}.header`),
    value: stats[key],
    footer: t(`${key}.footer`, { year }),
  }));

  return <CardsGroup cards={cards} />;
}
