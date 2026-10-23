import { getTranslations } from "next-intl/server";
import { getClientsStats } from "@/data/clients";
import { getCurrentYear } from "@/lib/utils";
import { CardsGroup } from "@/components/admin/shared/cardsGroup";
import { clientStatsKeys } from "@/constants/admin/cardStats";

export async function ClientsStatsCards() {
  const t = await getTranslations("Admin.Clients.stats");
  const stats = await getClientsStats();
  const year = getCurrentYear();

  const mappedKeys = clientStatsKeys.map(({ key }) => ({
    key,
    header: t(`${key}.header`),
    content: stats[key],
    footer: t(`${key}.footer`, { year }),
  }));

  return <CardsGroup cardsData={mappedKeys} />;
}
