import { ContractDetailsForm } from "@/components/admin/sections/settings/contract/contractDetailsForm";
import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";

export default async function ContractDetails() {
  const session = await adminCheck();

  const contractSettings = await db.contractSettings.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <div className="flex w-full flex-col items-center">
      <ContractDetailsForm
        defaultValues={{ overtimeRate: contractSettings?.overtimeRate.toString() ?? "" }}
        isNew={!contractSettings}
      />
    </div>
  );
}
