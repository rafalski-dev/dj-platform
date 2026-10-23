import { CreateClientForm } from "@/components/admin/sections/clients/clientCreate/createClientForm";
import { Breadcrumbs } from "@/components/admin/shared/breadcrumbs";
import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { getTranslations } from "next-intl/server";

export default async function CreateClient() {
  const t = await getTranslations("Admin.Clients.Create.page");

  return (
    <>
      <Breadcrumbs />
      <SectionHeader title={t("title")} description={t("description")} />
      <CreateClientForm />
    </>
  );
}
