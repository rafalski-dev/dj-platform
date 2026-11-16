"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { ControlledPasswordInput } from "@/components/shared/form/inputFields";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { useForm } from "react-hook-form";
import { KeyRoundIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordType } from "@/validation/settings";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/shadcn/toast";

export function AccountPasswordDetails() {
  const t = useTranslations("Admin.Settings");
  const schema = useMemo(() => changePasswordSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  async function onSubmit(formData: ChangePasswordType) {
    const { error } = await authClient.changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      revokeOtherSessions: true,
    });

    if (error && error.code === "INVALID_PASSWORD") {
      setError("currentPassword", { message: t("fields.currentPassword.invalid") });
      return;
    }

    if (error) {
      toast.add({ type: "error", title: t("password.error") });
      return;
    }

    toast.add({ type: "success", title: t("password.success") });
    reset();
  }

  return (
    <Card size="sm" className="w-full md:max-w-2/3">
      <GeneralCardHeader title={t("password.title")} icon={<KeyRoundIcon />} />
      <CardContent>
        <form id="updatePassword" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <ControlledPasswordInput
              control={control}
              name="currentPassword"
              label={t("fields.currentPassword.label")}
              autoComplete="current-password"
            />
            <ControlledPasswordInput
              control={control}
              name="newPassword"
              label={t("fields.newPassword.label")}
              autoComplete="new-password"
            />
            <ControlledPasswordInput
              control={control}
              name="confirmPassword"
              label={t("fields.confirmPassword.label")}
              autoComplete="new-password"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm" type="submit" form="updatePassword" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? (
            <>
              <Spinner />
              {t("password.submitting")}
            </>
          ) : (
            t("password.submit")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
