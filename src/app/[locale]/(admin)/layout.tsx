import { HeaderAdmin } from "@/components/admin/layout/header/header";
import { NavigationAdminDesktop } from "@/components/admin/layout/navigation/navigations";
import { LogoutButton } from "@/components/admin/shared/logoutButton";
import { Wrapper } from "@/components/shared/wrapper";
import { adminCheck } from "@/lib/auth-helpers";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await adminCheck();

  return (
    <>
      <HeaderAdmin />
      <Wrapper>
        <div className="grid min-h-dvh grid-cols-1 pt-18 lg:grid-cols-[250px_1fr]">
          <aside className="border-border hidden h-[calc(100dvh-4.5rem)] border-r pr-5 lg:sticky lg:top-18 lg:flex lg:flex-col lg:justify-between lg:py-8">
            <NavigationAdminDesktop />
            <LogoutButton />
          </aside>
          <main className="flex flex-col gap-5 py-5 md:py-6 lg:py-8 lg:pl-8">{children}</main>
        </div>
      </Wrapper>
    </>
  );
}
