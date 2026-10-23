import { CardsGroup } from "../../shared/cardsGroup";
import { getTranslations } from "next-intl/server";
import { getCurrentYear } from "@/lib/utils";
import { getHomeStats } from "@/data/home";
import { homeStatsKeys } from "@/constants/admin/cardStats";

export async function HomeStatsCards() {
  const t = await getTranslations("Admin.Home.stats");
  const stats = await getHomeStats();

  const mappedKeys = homeStatsKeys.map(({ key }) => ({
    key,
    header: t(`${key}.header`, { year: getCurrentYear() }),
    content: stats[key],
    footer: t(`${key}.footer`),
  }));

  return <CardsGroup cardsData={mappedKeys} />;
}
