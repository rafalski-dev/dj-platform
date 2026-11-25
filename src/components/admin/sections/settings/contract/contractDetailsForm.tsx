"use client";

import { FieldPath, useForm } from "react-hook-form";
import { toast } from "@/components/ui/shadcn/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { ClockPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { contractDetailsSchema, ContractDetailsType } from "@/validation/settings";
import { contractDetailsAction } from "@/actions/settings";

type ContractDetailsFormProps = { defaultValues: ContractDetailsType; isNew: boolean };

export function ContractDetailsForm({ defaultValues, isNew }: ContractDetailsFormProps) {
  const t = useTranslations("Admin.Settings");
  const schema = useMemo(() => contractDetailsSchema(t), [t]);
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, isDirty },
  } = useForm<ContractDetailsType>({ defaultValues, resolver: zodResolver(schema) });

  async function onSubmit(formData: ContractDetailsType) {
    const response = await contractDetailsAction(formData);

    if (!response.success) {
      toast.add({
        type: "error",
        title: "Contract details weren't saved",
        description: response.message,
      });

      if (response.errors) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as FieldPath<ContractDetailsType>, { message });
        });
      }
      return;
    }

    toast.add({ type: "success", title: response.message });
    reset(formData);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5 md:max-w-2/3"
    >
      <Card size="sm">
        <GeneralCardHeader title="Overtime" icon={<ClockPlusIcon />} />
        <CardContent className="flex flex-col gap-3">
          <ControlledInput
            control={control}
            name="overtimeRate"
            label="Rate for each started hour over the contract time"
            type="number"
            placeholder="e.g. 300"
            icon="zł"
            align="inline-end"
            required
          />
        </CardContent>
      </Card>

      <Button type="submit" className="self-end" disabled={isSubmitting || !isDirty}>
        {isSubmitting ? (
          <>
            <Spinner />
            Saving
          </>
        ) : isNew ? (
          "Save contract details"
        ) : (
          "Save changes"
        )}
      </Button>
    </form>
  );
}
