import { getClientsStats } from "@/data/clients";
import { CardsList } from "./cardsList";
import { getCurrentYear } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function ClientsStatsCards() {
  const stats = await getClientsStats();
  const t = await getTranslations("Admin.Clients.stats");
  const cardsData = [
    {
      header: t("newThisSeason.header"),
      content: stats.newThisSeason,
      footer: t("newThisSeason.footer", { year: String(getCurrentYear()) }),
    },
    {
      header: t("activeClients.header"),
      content: stats.activeClients,
      footer: t("activeClients.footer"),
    },
    {
      header: t("withoutEvent.header"),
      content: stats.withoutEvent,
      footer: t("withoutEvent.footer"),
    },
    {
      header: t("needsAttention.header"),
      content: stats.needsAttention,
      footer: t("needsAttention.footer"),
    },
  ];
  return <CardsList localData={cardsData} />;
}
