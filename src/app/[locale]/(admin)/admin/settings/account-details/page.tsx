import { AccountBasicDetails } from "@/components/admin/sections/settings/account/accountBasicDetails";
import { AccountEmailDetails } from "@/components/admin/sections/settings/account/accountEmailDetails";
import { AccountPasswordDetails } from "@/components/admin/sections/settings/account/accountPasswordDetails";
import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/auth-helpers";
import { getLocale } from "next-intl/server";

export default async function PersonalDetails() {
  const locale = await getLocale();
  const session = await getSession();
  if (!session) return redirect({ href: "/login", locale });

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <AccountBasicDetails fullName={session.user.name} />
      <AccountEmailDetails currentEmail={session.user.email} />
      <AccountPasswordDetails />
    </div>
  );
}
