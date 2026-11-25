import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { ContractCard } from "@/components/client/sections/contract/contractCard";
import { ContractEmpty } from "@/components/client/sections/contract/contractEmpty";
import { getClientContract } from "@/data/contracts";
import { getContractDetails, getSelectedEventOption } from "@/data/dashboard";
import { getTranslations } from "next-intl/server";

export default async function DashboardContracts() {
  const [t, contract, selected] = await Promise.all([
    getTranslations("Dashboard"),
    getClientContract(),
    getSelectedEventOption(),
  ]);

  // no contract yet – show what will go into it (only for an event, not an inquiry)
  const details =
    !contract && selected?.kind === "event" ? await getContractDetails(selected.id) : null;

  return (
    <>
      <SectionHeader title={t("Pages.contracts")} />
      {contract ? (
        // the DJ has sent it – download + upload the signed one (UI only for now)
        <ContractCard ready />
      ) : (
        <ContractEmpty details={details} />
      )}
    </>
  );
}
