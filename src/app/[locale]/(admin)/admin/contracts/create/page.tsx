import { ContractCreateForm } from "@/components/admin/sections/contracts/contractCreate/contractCreateForm";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { Card } from "@/components/ui/shadcn/card";

export default async function CreateContract() {
  // const clients = (await db.client.findMany()).map((client) => ({ label: client, value: client }));
  // const events = (await db.event.findMany()).map((event) => ({ label: event, value: event }));
  return (
    <>
      <Breadcrumbs />
      <SectionHeader title="Create contract" />
      <Card size="md">
        <GeneralCardHeader title="Contract" />
        <ContractCreateForm />
      </Card>
    </>
  );
}
