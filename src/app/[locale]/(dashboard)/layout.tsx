import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect({ href: "/login", locale });
  }
  return <>{children}</>;
}
