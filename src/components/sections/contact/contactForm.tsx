"use client";

import { CheckboxField } from "@/components/shared/form/checkboxField";
import { InputField } from "@/components/shared/form/inputField";
import { SelectField } from "@/components/shared/form/selectField";
import { TextareaField } from "@/components/shared/form/textareaField";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { eventTypeKeys } from "@/constants/contact";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function ContactForm({ className }: { className: string }) {
  const t = useTranslations("LandingPage.Contact.contactForm");
  return (
    <form
      className={cn("border-border/20 bg-card rounded-2xl border p-5 md:p-6 lg:p-7", className)}
    >
      <FieldGroup className="gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <InputField
            name="fullName"
            label={t("formInputs.fullName.label")}
            placeholder={t("formInputs.fullName.placeholder")}
            required
            error={""}
          />
          <InputField
            name="email"
            label={t("formInputs.email.label")}
            placeholder={t("formInputs.email.placeholder")}
            required
            error={""}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <InputField
            name="phone"
            label={t("formInputs.phone.label")}
            placeholder={t("formInputs.phone.placeholder")}
            required
            error={""}
          />
          <InputField
            name="eventDate"
            label={t("formInputs.eventDate.label")}
            placeholder={t("formInputs.eventDate.placeholder")}
            error={""}
          />
        </div>
        <SelectField
          name="eventType"
          label={t("formInputs.eventType.label")}
          items={eventTypeKeys.map(({ labelKey, value }) => {
            return { label: t(`formInputs.eventType.options.${labelKey}`), value: value };
          })}
          required
          error={""}
        />
        <InputField
          name="place"
          label={t("formInputs.place.label")}
          placeholder={t("formInputs.place.placeholder")}
          error={""}
        />
        <TextareaField
          name="message"
          label={t("formInputs.message.label")}
          placeholder={t("formInputs.message.placeholder")}
          required
          inputStyles={"min-h-35"}
          error={""}
        />
        <CheckboxField
          fieldStyle="mt-2"
          name="terms"
          label={t("formInputs.terms.label")}
          error={""}
        />
        <Button className="mt-2" type="submit">
          {t("formButton")}
        </Button>
        <FieldDescription className="text-popover-foreground/80 text-[12px] font-light">
          {t("formDescription")}
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
