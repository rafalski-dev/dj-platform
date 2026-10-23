import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { FormSection } from "./formSection";
import { Separator } from "@/components/ui/shadcn/separator";
import { useFormContext, useWatch } from "react-hook-form";
import { SummaryRow } from "./summaryRow";
import { createInitials } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { CreateClientType } from "@/validation/clients";

export function IndividualSummary() {
  const { control } = useFormContext<CreateClientType>();
  const t = useTranslations("Admin.Clients.Form");
  const [clientType, firstName, lastName] = useWatch({
    control,
    name: ["clientType", "personalDetails.firstName", "personalDetails.lastName"],
  });

  const fullName = `${firstName} ${lastName}`.trim();
  return (
    <FormSection title={t("sections.preview")}>
      <div>
        <div className="flex flex-row gap-4 pb-4">
          <Avatar className="size-12" aria-hidden="true">
            <AvatarFallback className="text-lg">
              {createInitials(fullName) || <UserIcon strokeWidth={1.6} />}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start gap-1">
            <div className="text-[15px] font-medium tracking-wide">
              {fullName || t("preview.fullNamePlaceholder")}
            </div>
            <span className="bg-gold-light text-background w-fit rounded px-1 py-0.5 text-[13px] font-medium tracking-wide uppercase">
              {t(`clientType.options.${clientType}.title`)}
            </span>
          </div>
        </div>
        <Separator />
        <dl className="flex flex-col gap-1 pt-4">
          <SummaryRow
            label={t("fields.gender.label")}
            name="personalDetails.gender"
            formatValue={(value) => t(`fields.gender.options.${value}`)}
          />
          <SummaryRow label={t("fields.idCardNumber.label")} name="personalDetails.idCardNumber" />
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
