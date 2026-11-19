import { SectionHeader } from "@/components/admin/shared/section/sectionHeader";
import { PageTabs } from "@/components/shared/tabs";
import { Pathname } from "@/types/navigation";
import { KeyRoundIcon, UserIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

// Same pattern as the admin Settings: tabs are links, each tab is its own route
export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("Dashboard.Account");

  const accountOptions: {
    key: string;
    label: string;
    icon: React.ReactNode;
    pathname: Pathname;
  }[] = [
    {
      key: "details",
      label: t("tabs.details"),
      icon: <UserIcon size={18} />,
      pathname: "/dashboard/account/details",
    },
    {
      key: "login",
      label: t("tabs.login"),
      icon: <KeyRoundIcon size={18} />,
      pathname: "/dashboard/account/login",
    },
  ];

  return (
    <>
      <SectionHeader title={t("title")} description={t("description")} />
      <PageTabs items={accountOptions} />
      {children}
    </>
  );
}
