import { LogoutButton } from "@/components/admin/shared/logoutButton";
import { HeaderClient } from "@/components/client/layout/header/header";
import { NavigationClientDesktop } from "@/components/client/layout/navigation/navigations";
import { EventSelector } from "@/components/client/layout/navigation/eventSelector";
import { getSelectedEventOption } from "@/data/dashboard";
import { Wrapper } from "@/components/shared/wrapper";
import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/auth-helpers";
import { getLocale } from "next-intl/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const session = await getSession();

  if (!session) return redirect({ href: "/login", locale });

  if (session.user.role === "Admin") return redirect({ href: "/admin", locale });

  const selected = await getSelectedEventOption();
  const hasEvent = selected?.kind === "event";

  return (
    <>
      <HeaderClient />
      <Wrapper>
        <div className="grid min-h-dvh grid-cols-1 pt-18 lg:grid-cols-[250px_1fr]">
          <aside className="border-border hidden h-[calc(100dvh-4.5rem)] border-r pr-5 lg:sticky lg:top-18 lg:flex lg:flex-col lg:justify-between lg:py-8">
            <NavigationClientDesktop eventSelector={<EventSelector />} hasEvent={hasEvent} />
            <LogoutButton />
          </aside>
          <main className="flex flex-col gap-5 py-5 md:py-6 lg:py-8 lg:pl-8">{children}</main>
        </div>
      </Wrapper>
    </>
  );
}
