"use client";

import { ControlledInput } from "@/components/shared/form/inputFields";
import { FormSection } from "./formSection";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

export function Address() {
  const { control } = useFormContext();
  const t = useTranslations("Admin.Clients.Create");
  const clientType = useWatch({ control, name: "clientType" });

  return (
    <FormSection
      title={t(clientType === "Individual" ? "sections.homeAddress" : "sections.businessAddress")}
    >
      <ControlledInput
        name="addressDetails.streetAndNumber"
        control={control}
        label={t("fields.streetAndNumber.label")}
        placeholder={t("fields.streetAndNumber.placeholder")}
      />
      <div className="flex flex-col gap-3 md:flex-row">
        <ControlledInput
          name="addressDetails.postcode"
          control={control}
          label={t("fields.postcode.label")}
          placeholder={t("fields.postcode.placeholder")}
        />
        <ControlledInput
          name="addressDetails.city"
          control={control}
          label={t("fields.city.label")}
          placeholder={t("fields.city.placeholder")}
        />
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <ControlledInput
          name="addressDetails.region"
          control={control}
          label={t("fields.region.label")}
          placeholder={t("fields.region.placeholder")}
        />
        <ControlledInput
          name="addressDetails.country"
          control={control}
          label={t("fields.country.label")}
          placeholder={t("fields.country.placeholder")}
        />
      </div>
    </FormSection>
  );
}
