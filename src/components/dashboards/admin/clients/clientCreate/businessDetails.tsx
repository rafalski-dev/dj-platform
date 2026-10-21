import { ControlledInput } from "@/components/shared/form/inputFields";
import { FormSection } from "./formSection";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

export function BusinessDetails() {
  const { control } = useFormContext();
  const t = useTranslations("Admin.Clients.Form");
  return (
    <FormSection title={t("sections.businessDetails")}>
      <ControlledInput
        name="businessDetails.businessName"
        control={control}
        label={t("fields.businessName.label")}
        placeholder={t("fields.businessName.placeholder")}
        required
      />
      <ControlledInput
        name="businessDetails.taxId"
        control={control}
        label={t("fields.taxId.label")}
        placeholder={t("fields.taxId.placeholder")}
        required
      />
    </FormSection>
  );
}
