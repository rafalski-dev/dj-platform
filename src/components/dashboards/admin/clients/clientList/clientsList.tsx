import { getPaginationedClients } from "@/data/clients";
import { getRelevantEvent } from "@/lib/utils";
import { ClientsTable } from "./clientsTable";
import { PersistedParams } from "@/lib/searchParams";
import { ClientsCards } from "./clientsCards";
import { EmptyState } from "@/components/dashboards/shared/emptyState";
import { PlusIcon, SearchXIcon, UsersIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function ClientsList({ persistedParams }: { persistedParams: PersistedParams }) {
  const t = await getTranslations("Admin.Clients");

  const fetchedData = await getPaginationedClients(
    persistedParams.limit,
    persistedParams.page,
    persistedParams.query,
    persistedParams.filter,
  );

  const sortedEvents = fetchedData.map((client) => {
    return { ...client, event: getRelevantEvent(client.events) };
  });

  const noClients = (
    <EmptyState
      icon={<UsersIcon strokeWidth={1.5} />}
      title={t("empty.noClients.title")}
      description={t("empty.noClients.description")}
      action={{
        label: t("addingBtn"),
        href: "/admin/clients/create",
        icon: <PlusIcon className="size-3" strokeWidth={3} />,
      }}
    />
  );

  const noResults = (
    <EmptyState
      icon={<SearchXIcon strokeWidth={1.5} />}
      title={t("empty.noResults.title")}
      description={
        persistedParams.query
          ? t("empty.noResults.descriptionQuery", { query: persistedParams.query })
          : t("empty.noResults.descriptionFilter")
      }
      action={{ label: t("empty.noResults.action"), href: "/admin/clients" }}
    />
  );

  const isFiltered = persistedParams.query || persistedParams.filter ? true : false;
  const selectEmptyState = isFiltered ? noResults : noClients;

  return (
    <>
      <ClientsTable sortedEvents={sortedEvents} selectEmptyState={selectEmptyState} />
      <ClientsCards sortedEvents={sortedEvents} selectEmptyState={selectEmptyState} />
    </>
  );
}
