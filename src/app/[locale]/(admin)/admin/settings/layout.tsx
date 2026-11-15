import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { PageTabs } from "@/components/shared/tabs";
import { Pathname } from "@/types/navigation";
import { Briefcase, UserIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("Admin.Settings");

  const settingOptions: {
    key: string;
    label: string;
    icon: React.ReactNode;
    pathname: Pathname;
  }[] = [
    {
      key: "accountDetails",
      label: t("tabs.accountDetails"),
      icon: <UserIcon size={18} />,
      pathname: "/admin/settings/account-details",
    },
    {
      key: "businessDetails",
      label: t("tabs.businessDetails"),
      icon: <Briefcase size={18} />,
      pathname: "/admin/settings/business-details",
    },
  ];

  return (
    <>
      <SectionHeader title={t("title")} description={t("description")} />
      <PageTabs items={settingOptions} />
      {children}
    </>
  );
}
