"use client";

import { ControlledInput } from "@/components/shared/form/inputFields";
import { ControlledSelect } from "@/components/shared/form/selectField";
import { useFormContext } from "react-hook-form";
import { FormSection } from "./formSection";
import { useTranslations } from "next-intl";

const GENDERS = ["Male", "Female", "Other"];

export function PersonalDetails() {
  const { control } = useFormContext();
  const t = useTranslations("Admin.Clients.Form");
  return (
    <FormSection title={t("sections.personalDetails")}>
      <div className="flex flex-col gap-3 md:flex-row">
        <ControlledInput
          name="personalDetails.firstName"
          control={control}
          label={t("fields.firstName.label")}
          placeholder={t("fields.firstName.placeholder")}
          required
        />
        <ControlledInput
          name="personalDetails.lastName"
          control={control}
          label={t("fields.lastName.label")}
          placeholder={t("fields.lastName.placeholder")}
          required
        />
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <ControlledInput
          name="personalDetails.idCardNumber"
          control={control}
          label={t("fields.idCardNumber.label")}
          placeholder={t("fields.idCardNumber.placeholder")}
        />
        <ControlledSelect
          name="personalDetails.gender"
          control={control}
          label={t("fields.gender.label")}
          placeholder={t("fields.gender.placeholder")}
          items={GENDERS.map((value) => ({
            value,
            label: t(`fields.gender.options.${value}`),
          }))}
          required
        />
      </div>
    </FormSection>
  );
}
