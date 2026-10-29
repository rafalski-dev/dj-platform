"use client";

import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useCreateEventContext } from "@/hooks/useCreateEventContext";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import { ControlledTextarea } from "@/components/shared/form/textareaField";
import { PackageField } from "../packageField";
import { FormFieldset } from "../formFieldset";
import { AddonsField } from "../addonsField";
import { CreateEventSchema } from "@/validation/events";

export function PackageStep() {
  const t = useTranslations("Admin.Events.Form");
  const { setCurrentStep } = useCreateEventContext();
  const { control, trigger } = useFormContext<CreateEventSchema>();
  const eventPackage = useWatch({ name: "package.eventPackage" });

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <GeneralCardHeader title={t("steps.package")} />
        <CardContent className="flex flex-col gap-6">
          <FormFieldset title={t("package.groups.package")} className="md:grid-cols-1">
            <PackageField />
          </FormFieldset>
          {eventPackage === "Signature" && (
            <div className="border-t pt-6">
              <FormFieldset title={t("package.groups.addons")} className="md:grid-cols-1">
                <AddonsField />
              </FormFieldset>
            </div>
          )}
          <div className="border-t pt-6">
            <FormFieldset title={t("package.groups.additional")} className="md:grid-cols-1">
              <ControlledTextarea
                name="package.message"
                control={control}
                label={t("package.message.label")}
                placeholder={t("package.message.placeholder")}
                counter={2000}
                className="min-h-30"
              />
            </FormFieldset>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep((prev) => prev - 1)}>
          {t("navigation.prev")}
        </Button>
        <Button
          size="sm"
          onClick={async () => {
            const isCorrect = await trigger("package");
            if (isCorrect) setCurrentStep((prev) => prev + 1);
          }}
        >
          {t("navigation.next")}
        </Button>
      </div>
    </div>
  );
}
