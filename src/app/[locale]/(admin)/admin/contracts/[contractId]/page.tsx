import { ContractHeader } from "@/components/admin/sections/contracts/contractDetails/contractHeader";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { getContractDetails } from "@/data/contracts";
import { notFound } from "next/navigation";

export default async function Contract({
  params,
}: {
  params: Promise<{ locale: string; contractId: string }>;
}) {
  const { contractId } = await params;

  const contract = await getContractDetails(contractId);
  if (!contract) notFound();

  return (
    <>
      <Breadcrumbs dynamicLabel={contract.contractNumber ?? "—"} />
      <ContractHeader fetchedData={contract} />
    </>
  );
}
