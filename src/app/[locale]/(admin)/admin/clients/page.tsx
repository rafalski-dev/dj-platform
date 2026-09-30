import { CardsList } from "@/components/dashboard/cardsList";
import { Filters } from "@/components/dashboard/filters";
import { SearchBar } from "@/components/dashboard/searchBar";
import { PageHeader } from "@/components/dashboard/shared/pageHeader";
import { Table } from "@/components/dashboard/table";
import { clientsCardData } from "@/constants/dashboard";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export default async function Clients() {
  const t = await getTranslations("Admin.Clients");
  const label = "8 clients";

  const clientsData = await db.client.findMany();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader labelText={label} titleText={t("title")} buttonText={t("addingBtn")} />
      <CardsList data={clientsCardData} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <SearchBar placeholder={t("searchBar.placeholder")} />
        <Filters all="All" firstCategory="Newst" secondCategory="Oldest" />
      </div>
      <Table data={clientsData} />
    </div>
  );
}
