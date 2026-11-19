import { EmptyState } from "@/components/admin/shared/emptyState";
import { MyDetailsForm } from "@/components/client/sections/account/myDetailsForm";
import { Card } from "@/components/ui/shadcn/card";
import { getMyDetails } from "@/data/dashboard";
import { getSession } from "@/lib/auth-helpers";
import { UserRoundXIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

// The contract checklist links here – the address is saved once for all the client's events
export default async function AccountDetails() {
  const t = await getTranslations("Dashboard.Account.details");
  const session = await getSession();
  const details = await getMyDetails();

  // only an inquiry so far – there's no Client to save the details to yet
  if (!session || !details)
    return (
      <Card size="md">
        <EmptyState
          icon={<UserRoundXIcon strokeWidth={1.5} />}
          title={t("empty.title")}
          description={t("empty.description")}
        />
      </Card>
    );

  return (
    <div className="flex w-full flex-col items-center">
      <MyDetailsForm
        accountEmail={session.user.email}
        defaultValues={{
          firstName: details.firstName,
          lastName: details.lastName,
          phone: details.phone ?? "",
          streetAndNumber: details.streetAndNumber ?? "",
          postcode: details.postcode ?? "",
          city: details.city ?? "",
          region: details.region ?? "",
          country: details.country ?? "",
        }}
      />
    </div>
  );
}
