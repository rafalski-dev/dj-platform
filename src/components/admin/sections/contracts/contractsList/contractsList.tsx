import { getPaginatedContracts } from "@/data/contracts";
import { PersistedParams } from "@/lib/searchParams";
import { EmptyState } from "@/components/admin/shared/emptyState";
import { FileTextIcon, SearchXIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContractsTable } from "./contractsTable";
import { ContractsCards } from "./contractsCards";

export async function ContractsList({ persistedParams }: { persistedParams: PersistedParams }) {
  const t = await getTranslations("Admin.Contracts");

  const contracts = await getPaginatedContracts(
    persistedParams.limit,
    persistedParams.page,
    persistedParams.query,
  );

  const noContracts = (
    <EmptyState
      icon={<FileTextIcon strokeWidth={1.5} />}
      title={t("empty.noContracts.title")}
      description={t("empty.noContracts.description")}
      action={{ label: t("empty.noContracts.action"), href: "/admin/events" }}
    />
  );

  const noResults = (
    <EmptyState
      icon={<SearchXIcon strokeWidth={1.5} />}
      title={t("empty.noResults.title")}
      description={t("empty.noResults.descriptionQuery", { query: persistedParams.query ?? "" })}
      action={{ label: t("empty.noResults.action"), href: "/admin/contracts" }}
    />
  );

  const selectEmptyState = persistedParams.query ? noResults : noContracts;

  return (
    <>
      <ContractsTable contracts={contracts} selectEmptyState={selectEmptyState} />
      <ContractsCards contracts={contracts} selectEmptyState={selectEmptyState} />
    </>
  );
}
