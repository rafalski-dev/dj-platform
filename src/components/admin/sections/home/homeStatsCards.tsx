import { CardsGroup } from "../../shared/cardsGroup";
import { getTranslations } from "next-intl/server";
import { getHomeStats } from "@/data/home";
import { homeStatsKeys } from "@/constants/admin/cardStats";

export async function HomeStatsCards() {
  const t = await getTranslations("Admin.Home.stats");
  const stats = await getHomeStats();

  const mappedKeys = homeStatsKeys.map(({ key }) => ({
    key,
    header: t(`${key}.header`),
    content: stats[key],
    footer: t(`${key}.footer`),
  }));

  return <CardsGroup cardsData={mappedKeys} />;
}
