import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/auth-helpers";
import { getLocale } from "next-intl/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const session = await getSession();

  if (!session) return redirect({ href: "/login", locale });

  if (session.user.role === "Admin") return redirect({ href: "/admin", locale });

  return <>{children}</>;
}
