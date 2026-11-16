import { ContractCreateForm } from "@/components/admin/sections/contracts/contractCreate/contractCreateForm";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { Card } from "@/components/ui/shadcn/card";
import { getClientsWithEventsWithoutContract } from "@/data/contracts";
import { getTranslations } from "next-intl/server";
import { EmptyState } from "@/components/admin/shared/emptyState";
import { CalendarXIcon } from "lucide-react";

export default async function CreateContract() {
  const t = await getTranslations("Admin.Contracts.Create");
  const clients = await getClientsWithEventsWithoutContract();

  return (
    <>
      <Breadcrumbs />
      <SectionHeader title={t("title")} />
      <Card size="md">
        <GeneralCardHeader title={t("cardTitle")} />
        {clients.length === 0 ? (
          <EmptyState
            icon={<CalendarXIcon strokeWidth={1.5} />}
            title={t("empty.title")}
            description={t("empty.description")}
            action={{ label: t("empty.action"), href: "/admin/events/create" }}
          />
        ) : (
          <ContractCreateForm clients={clients} />
        )}
      </Card>
    </>
  );
}
