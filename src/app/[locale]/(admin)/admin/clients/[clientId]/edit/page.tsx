import { EditClientForm } from "@/components/admin/sections/clients/clientEdit/editClientForm";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
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
      <SectionHeader title={t("title")} description={t("description")} />
      <EditClientForm fetchedData={client} clientId={clientId} />
    </>
  );
}
