import { HeaderAdmin } from "@/components/dashboard/header";
import { LogoutButton } from "@/components/dashboard/logoutButton";
import { AdminDesktopNavigation } from "@/components/dashboard/navigations/adminNavs";
import { Wrapper } from "@/components/shared/wrapper";

import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/auth-helpers";
import { cn } from "@/lib/utils";
import { getLocale } from "next-intl/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const session = await getSession();

  if (!session) return redirect({ href: "/login", locale });

  if (session.user.role !== "Admin") return redirect({ href: "/dashboard", locale });

  return (
    <>
      <HeaderAdmin />
      <Wrapper>
        <div className="grid min-h-dvh grid-cols-1 pt-18 lg:grid-cols-[250px_1fr]">
          <aside className="border-border/12 hidden h-[calc(100dvh-4.5rem)] border-r pr-5 lg:sticky lg:top-18 lg:flex lg:flex-col lg:justify-between lg:py-8">
            <AdminDesktopNavigation />
            <LogoutButton />
          </aside>
          <main className="py-5 md:py-6 lg:py-9 lg:pl-9">{children}</main>
        </div>
      </Wrapper>
    </>
  );
}
