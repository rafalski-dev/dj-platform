"use client";

import { FieldPath, FormProvider, useForm } from "react-hook-form";
import { toast } from "@/components/ui/shadcn/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { businessDetailsSchema, BusinessDetailsType } from "@/validation/settings";
import { BusinessBasicDetails } from "./businessBasicDetails";
import { BusinessContactDetails } from "./businessContactDetails";
import { BusinessAddressDetails } from "./businessAddressDetails";
import { businessDetailsAction } from "@/actions/settings";

type BusinessDetailsFormProps = { defaultValues: BusinessDetailsType; isNew: boolean };

export function BusinessDetailsForm({ defaultValues, isNew }: BusinessDetailsFormProps) {
  const t = useTranslations("Admin.Settings");
  const schema = useMemo(() => businessDetailsSchema(t), [t]);
  const formMethods = useForm<BusinessDetailsType>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { isSubmitting, isDirty } = formMethods.formState;

  async function onSubmit(formData: BusinessDetailsType) {
    const response = await businessDetailsAction(formData);

    if (!response.success) {
      toast.add({
        type: "error",
        title: "Business details weren't saved",
        description: response.message,
      });

      if (response.errors) {
        Object.entries(response.errors).forEach(([field, message]) => {
          formMethods.setError(field as FieldPath<BusinessDetailsType>, { message });
        });
      }
      return;
    }

    toast.add({ type: "success", title: response.message });
    formMethods.reset(formData);
  }

  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5 md:max-w-2/3"
      >
        <BusinessBasicDetails />
        <BusinessContactDetails />
        <BusinessAddressDetails />

        <Button type="submit" className="self-end" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? (
            <>
              <Spinner />
              Saving
            </>
          ) : isNew ? (
            "Save business details"
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
