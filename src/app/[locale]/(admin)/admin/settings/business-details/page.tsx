import { BusinessDetailsForm } from "@/components/admin/sections/settings/business/businessDetailsForm";
import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";

export default async function BusinessDetails() {
  const session = await adminCheck();

  const businessDetails = await db.businessDetails.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <div className="flex w-full flex-col items-center">
      <BusinessDetailsForm
        defaultValues={{
          businessName: businessDetails?.businessName ?? "",
          firstName: businessDetails?.firstName ?? "",
          lastName: businessDetails?.lastName ?? "",
          email: businessDetails?.email ?? "",
          phone: businessDetails?.phone ?? "",
          streetAndNumber: businessDetails?.streetAndNumber ?? "",
          postcode: businessDetails?.postcode ?? "",
          city: businessDetails?.city ?? "",
          region: businessDetails?.region ?? "",
          country: businessDetails?.country ?? "",
        }}
        isNew={!businessDetails}
      />
    </div>
  );
}
