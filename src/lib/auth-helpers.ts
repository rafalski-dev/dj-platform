import { headers } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

export const adminCheck = cache(async () => {
  const locale = await getLocale();
  const session = await getSession();

  if (!session) return redirect({ href: "/login", locale });
  if (session.user.role !== "Admin") return redirect({ href: "/dashboard", locale });

  return session;
});
