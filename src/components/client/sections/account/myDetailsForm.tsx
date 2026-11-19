"use client";

import { myDetailsAction } from "@/actions/dashboard";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import { myDetailsSchema, MyDetailsType } from "@/validation/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@/components/ui/shadcn/field";
import { InputGroup, InputGroupInput } from "@/components/ui/shadcn/input-group";
import { InfoIcon, MapPinIcon, PhoneIcon, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FieldPath, useForm } from "react-hook-form";

type MyDetailsFormProps = {
  defaultValues: MyDetailsType;
  // the login email – shown only, not part of the form
  accountEmail: string;
};

// Same flow as the admin BusinessDetailsForm, but the client's own record
export function MyDetailsForm({ defaultValues, accountEmail }: MyDetailsFormProps) {
  const t = useTranslations("Dashboard.Account");
  const schema = useMemo(() => myDetailsSchema(t), [t]);
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, isDirty },
  } = useForm<MyDetailsType>({ defaultValues, resolver: zodResolver(schema) });

  async function onSubmit(formData: MyDetailsType) {
    const response = await myDetailsAction(formData);

    if (!response.success) {
      toast.add({ type: "error", title: t("details.notSaved"), description: response.message });

      if (response.errors) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as FieldPath<MyDetailsType>, { message });
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
        <GeneralCardHeader title={t("details.personalTitle")} icon={<UserIcon />} />
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <ControlledInput
              control={control}
              name="firstName"
              label={t("details.fields.firstName.label")}
              placeholder="Anna"
              required
            />
            <ControlledInput
              control={control}
              name="lastName"
              label={t("details.fields.lastName.label")}
              placeholder="Nowak"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card size="sm">
        <GeneralCardHeader title={t("details.contactTitle")} icon={<PhoneIcon />} />
        <CardContent className="flex flex-col gap-3">
          {/* Read-only – it's the login email (changing it will go to the Login and password tab) */}
          <Field>
            <FieldLabel htmlFor="accountEmail">{t("details.fields.email.label")}</FieldLabel>
            <InputGroup>
              <InputGroupInput id="accountEmail" type="email" value={accountEmail} disabled />
            </InputGroup>
            <p className="text-muted-foreground flex gap-2 text-xs">
              <InfoIcon size={14} className="mt-px shrink-0" />
              {t("details.fields.email.hint")}
            </p>
          </Field>
          <ControlledInput
            control={control}
            name="phone"
            label={t("details.fields.phone.label")}
            type="tel"
            placeholder="600 123 456"
          />
        </CardContent>
      </Card>

      <Card size="sm">
        <GeneralCardHeader title={t("details.addressTitle")} icon={<MapPinIcon />} />
        <CardContent className="flex flex-col gap-3">
          <ControlledInput
            control={control}
            name="streetAndNumber"
            label={t("details.fields.streetAndNumber.label")}
            placeholder="ul. Długa 12/4"
            required
          />
          <div className="flex flex-col gap-3 md:flex-row">
            <ControlledInput
              control={control}
              name="postcode"
              label={t("details.fields.postcode.label")}
              placeholder="00-001"
              required
            />
            <ControlledInput
              control={control}
              name="city"
              label={t("details.fields.city.label")}
              placeholder="Warszawa"
              required
            />
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <ControlledInput
              control={control}
              name="region"
              label={t("details.fields.region.label")}
              placeholder="Mazowieckie"
            />
            <ControlledInput
              control={control}
              name="country"
              label={t("details.fields.country.label")}
              placeholder="Polska"
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="self-end" disabled={isSubmitting || !isDirty}>
        {isSubmitting ? (
          <>
            <Spinner />
            {t("details.saving")}
          </>
        ) : (
          t("details.save")
        )}
      </Button>
    </form>
  );
}
