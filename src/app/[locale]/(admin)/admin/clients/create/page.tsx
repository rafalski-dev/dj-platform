import { CreateClientForm } from "@/components/dashboards/admin/clients/createClient/createClientForm";
import { Breadcrumbs } from "@/components/dashboards/shared/breadcrumbs";
import { PageHeader } from "@/components/dashboards/shared/pageHeader";
import { getTranslations } from "next-intl/server";

export default async function CreateClient() {
  const t = await getTranslations("Admin.Clients.Create.page");

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <PageHeader title={t("title")} description={t("description")} />
      <CreateClientForm />
    </div>
  );
}
