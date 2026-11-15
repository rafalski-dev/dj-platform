"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { FieldPath, useForm } from "react-hook-form";
import { toast } from "@/components/ui/shadcn/toast";
import { accountDetailsAction } from "@/actions/settings";
import { UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountDetailsSchema, AccountDetailsType } from "@/validation/settings";

type AccountBasicDetailsProps = {
  fullName?: string;
};

export function AccountBasicDetails({ fullName }: AccountBasicDetailsProps) {
  const t = useTranslations("Admin.Settings");
  const schema = useMemo(() => accountDetailsSchema(t), [t]);
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<AccountDetailsType>({
    defaultValues: {
      fullName: fullName ?? "",
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(formData: AccountDetailsType) {
    const response = await accountDetailsAction(formData);

    if (!response.success) {
      toast.add({
        type: "error",
        title: "Account details weren't saved",
        description: response.message,
      });

      if (response.errors) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as FieldPath<AccountDetailsType>, { message });
        });
      }
      return;
    }

    toast.add({ type: "success", title: response.message });
    reset(formData);
  }
  return (
    <Card size="sm" className="w-full md:max-w-2/3">
      <GeneralCardHeader title="Account details" icon={<UserIcon />} />
      <CardContent>
        <form id="accountDetails" noValidate onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            control={control}
            name="fullName"
            label="Full name"
            placeholder="Jan Kowalski"
            required
          />
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm" form="accountDetails" type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? (
            <>
              <Spinner />
              Saving
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
