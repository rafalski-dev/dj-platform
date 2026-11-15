"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { Field, FieldLabel } from "@/components/ui/shadcn/field";
import { InputGroup, InputGroupInput } from "@/components/ui/shadcn/input-group";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { useForm } from "react-hook-form";
import { InfoIcon, MailIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";
import { getPathname } from "@/i18n/navigation";
import { toast } from "@/components/ui/shadcn/toast";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeEmailSchema, ChangeEmailType } from "@/validation/settings";

export function AccountEmailDetails({ currentEmail }: { currentEmail: string }) {
  const t = useTranslations("Admin.Settings");
  const schema = useMemo(() => changeEmailSchema(t, currentEmail), [t, currentEmail]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ChangeEmailType>({
    defaultValues: { newEmail: "" },
    resolver: zodResolver(schema),
  });
  const locale = useLocale();

  async function onSubmit(formData: ChangeEmailType) {
    const { error } = await authClient.changeEmail({
      newEmail: formData.newEmail,
      callbackURL: getPathname({ href: "/admin/settings/account-details", locale }),
    });

    if (error) {
      toast.add({ type: "error", title: "Couldn't send the link", description: error.message });
      return;
    }

    toast.add({
      type: "success",
      title: "Check your inbox",
      description: `We've sent a link to ${currentEmail} to approve the change.`,
    });
    reset();
  }

  return (
    <Card size="sm" className="w-full md:max-w-2/3">
      <GeneralCardHeader title="Email" icon={<MailIcon />} />
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="currentEmail">Current email</FieldLabel>
          <InputGroup>
            <InputGroupInput id="currentEmail" type="email" value={currentEmail} disabled />
          </InputGroup>
        </Field>
        <form id="changeEmail" noValidate onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            control={control}
            name="newEmail"
            label="New email"
            type="email"
            placeholder="jan@example.com"
            required
          />
        </form>
        <p className="text-muted-foreground flex gap-2 text-xs">
          <InfoIcon size={14} className="mt-px shrink-0" />
          First, approve the change with the link we send to {currentEmail}. Then confirm the new
          address with the link we send there. Until then, you&apos;ll keep logging in with{" "}
          {currentEmail}.
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm" form="changeEmail" type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? (
            <>
              <Spinner />
              Sending
            </>
          ) : (
            "Send confirmation link"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
