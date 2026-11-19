import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

// The nav links here, so the item stays active on both tabs – the first tab is the default
export default async function Account() {
  const locale = await getLocale();
  return redirect({ href: "/dashboard/account/details", locale });
}
