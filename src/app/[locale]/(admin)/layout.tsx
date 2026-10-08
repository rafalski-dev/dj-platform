import { HeaderAdmin } from "@/components/dashboards/admin/header";
import { AdminDesktopNavigation } from "@/components/dashboards/shared/adminNavs";
import { LogoutButton } from "@/components/dashboards/shared/logoutButton";
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
            <AdminDesktopNavigation />
            <LogoutButton />
          </aside>
          <main className="py-5 md:py-6 lg:py-9 lg:pl-9">{children}</main>
        </div>
      </Wrapper>
    </>
  );
}
