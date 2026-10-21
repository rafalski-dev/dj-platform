import { EditClientForm } from "@/components/dashboards/admin/clients/clientEdit/editClientForm";
import { Breadcrumbs } from "@/components/dashboards/shared/breadcrumbs";
import { PageHeader } from "@/components/dashboards/shared/pageHeader";
import { getClientToEdit } from "@/data/clients";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Edit({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const t = await getTranslations("Admin.Clients.Edit.page");

  const client = await getClientToEdit(clientId);

  if (!client) notFound();
  return (
    <>
      <Breadcrumbs dynamicLabel={client.name} />
      <PageHeader title={t("title")} description={t("description")} />
      <EditClientForm fetchedData={client} clientId={clientId} />
    </>
  );
}
