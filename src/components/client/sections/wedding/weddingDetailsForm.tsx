"use client";

import { weddingDetailsAction } from "@/actions/dashboard";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import { useRouter } from "@/i18n/navigation";
import { weddingDetailsSchema, WeddingDetailsType } from "@/validation/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon, UsersIcon, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FieldPath, useForm } from "react-hook-form";

type WeddingDetailsFormProps = { eventId: string; defaultValues: WeddingDetailsType };

// The couple, witnesses and parents for the DJ – after saving, back to the overview
export function WeddingDetailsForm({ eventId, defaultValues }: WeddingDetailsFormProps) {
  const t = useTranslations("Dashboard.WeddingEdit");
  const { push } = useRouter();
  const schema = useMemo(() => weddingDetailsSchema(t), [t]);
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty },
  } = useForm<WeddingDetailsType>({ defaultValues, resolver: zodResolver(schema) });

  async function onSubmit(formData: WeddingDetailsType) {
    const response = await weddingDetailsAction(eventId, formData);

    if (!response.success) {
      toast.add({ type: "error", title: t("notSaved"), description: response.message });

      if (response.errors) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as FieldPath<WeddingDetailsType>, { message });
        });
      }
      return;
    }

    toast.add({ type: "success", title: response.message });
    push("/dashboard");
  }

  const placeholder = t("fields.fullNamePlaceholder");

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <Card size="sm">
        <GeneralCardHeader title={t("coupleTitle")} icon={<HeartIcon />} />
        <CardContent className="flex flex-col gap-3 md:flex-row">
          <ControlledInput
            control={control}
            name="bride"
            label={t("fields.bride.label")}
            placeholder={placeholder}
            required
          />
          <ControlledInput
            control={control}
            name="groom"
            label={t("fields.groom.label")}
            placeholder={placeholder}
            required
          />
        </CardContent>
      </Card>

      <Card size="sm">
        <GeneralCardHeader title={t("witnessesTitle")} icon={<UsersIcon />} />
        <CardContent className="flex flex-col gap-3 md:flex-row">
          <ControlledInput
            control={control}
            name="brideWitness"
            label={t("fields.brideWitness")}
            placeholder={placeholder}
          />
          <ControlledInput
            control={control}
            name="groomWitness"
            label={t("fields.groomWitness")}
            placeholder={placeholder}
          />
        </CardContent>
      </Card>

      <Card size="sm">
        <GeneralCardHeader title={t("parentsTitle")} icon={<UserIcon />} />
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <ControlledInput
              control={control}
              name="brideMother"
              label={t("fields.brideMother")}
              placeholder={placeholder}
            />
            <ControlledInput
              control={control}
              name="brideFather"
              label={t("fields.brideFather")}
              placeholder={placeholder}
            />
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <ControlledInput
              control={control}
              name="groomMother"
              label={t("fields.groomMother")}
              placeholder={placeholder}
            />
            <ControlledInput
              control={control}
              name="groomFather"
              label={t("fields.groomFather")}
              placeholder={placeholder}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="self-end" disabled={isSubmitting || !isDirty}>
        {isSubmitting ? (
          <>
            <Spinner />
            {t("saving")}
          </>
        ) : (
          t("save")
        )}
      </Button>
    </form>
  );
}
