import { EmptyState } from "@/components/admin/shared/emptyState";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { Card } from "@/components/ui/shadcn/card";
import { getClientContract } from "@/data/contracts";
import { FileClockIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function DashboardContracts() {
  const t = await getTranslations("Dashboard");
  const contract = await getClientContract();

  return (
    <>
      <SectionHeader title={t("Pages.contracts")} />
      <Card size="md">
        {contract ? (
          // TODO: contract card (download + upload signed) – next step
          <p className="px-(--card-spacing)">{contract.contractNumber}</p>
        ) : (
          <EmptyState
            icon={<FileClockIcon strokeWidth={1.5} />}
            title={t("Contract.empty.title")}
            description={t("Contract.empty.description")}
          />
        )}
      </Card>
    </>
  );
}
