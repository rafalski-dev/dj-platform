"use client";

import { ControlledInput } from "@/components/shared/form/inputFields";
import { FormSection } from "./formSection";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

export function Contact() {
  const { control } = useFormContext();
  const t = useTranslations("Admin.Clients.Form");
  const clientType = useWatch({ control, name: "clientType" });

  return (
    <FormSection
      title={t(clientType === "Individual" ? "sections.contactDetails" : "sections.contactPerson")}
    >
      {clientType === "Business" && (
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
      )}
      <div className="flex flex-col gap-3 md:flex-row lg:flex-col">
        <ControlledInput
          name="contactDetails.email"
          control={control}
          label={t("fields.email.label")}
          placeholder={t("fields.email.placeholder")}
          type="email"
          required
        />
        <ControlledInput
          name="contactDetails.phone"
          control={control}
          label={t("fields.phone.label")}
          placeholder={t("fields.phone.placeholder")}
          type="tel"
        />
      </div>
    </FormSection>
  );
}
