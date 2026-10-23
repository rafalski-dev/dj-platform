import { CreateClientForm } from "@/components/admin/sections/clients/clientCreate/createClientForm";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { PageHeader } from "@/components/admin/shared/pageHeader";
import { getTranslations } from "next-intl/server";

export default async function CreateClient() {
  const t = await getTranslations("Admin.Clients.Create.page");

  return (
    <>
      <Breadcrumbs />
      <PageHeader title={t("title")} description={t("description")} />
      <CreateClientForm />
    </>
  );
}
