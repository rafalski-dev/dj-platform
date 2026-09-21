import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect({ href: "/dashboard", locale });
  }
  return <>{children}</>;
}
