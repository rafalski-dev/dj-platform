import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FormSection } from "./formSection";
import { Separator } from "@/components/ui/separator";
import { useFormContext, useWatch } from "react-hook-form";
import { SummaryItem, SummaryRow } from "./summaryRow";
import { createInitials } from "@/lib/utils";
import { BuildingIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function BusinessSummary() {
  const { control } = useFormContext();
  const t = useTranslations("Admin.Clients.Create");
  const [clientType, businessName, firstName, lastName] = useWatch({
    control,
    name: [
      "clientType",
      "businessDetails.businessName",
      "personalDetails.firstName",
      "personalDetails.lastName",
    ],
  });

  const contactPerson = `${firstName} ${lastName}`.trim();
  return (
    <FormSection title={t("sections.preview")}>
      <div>
        <div className="flex flex-row gap-4 pb-4">
          <Avatar className="size-12" aria-hidden="true">
            <AvatarFallback className="text-lg">
              {createInitials(businessName) || <BuildingIcon strokeWidth={1.6} />}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start gap-1">
            <div className="text-[15px] font-medium tracking-wide">
              {businessName || t("preview.businessNamePlaceholder")}
            </div>
            <span className="bg-gold-light text-background w-fit rounded px-1 py-0.5 text-[13px] font-medium tracking-wide uppercase">
              {t(`clientType.options.${clientType}.title`)}
            </span>
          </div>
        </div>
        <Separator />
        <dl className="flex flex-col gap-1 pt-4">
          <SummaryRow label={t("fields.taxId.label")} name="businessDetails.taxId" />
          <SummaryItem label={t("sections.contactPerson")} value={contactPerson} />
          <SummaryRow label={t("fields.email.label")} name="contactDetails.email" />
          <SummaryRow label={t("fields.phone.label")} name="contactDetails.phone" />
          <SummaryRow
            label={t("fields.streetAndNumber.label")}
            name="addressDetails.streetAndNumber"
          />
          <SummaryRow label={t("fields.postcode.label")} name="addressDetails.postcode" />
          <SummaryRow label={t("fields.city.label")} name="addressDetails.city" />
          <SummaryRow label={t("fields.region.label")} name="addressDetails.region" />
          <SummaryRow label={t("fields.country.label")} name="addressDetails.country" />
        </dl>
      </div>
    </FormSection>
  );
}
