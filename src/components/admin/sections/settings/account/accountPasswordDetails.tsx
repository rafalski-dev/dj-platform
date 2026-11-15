"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { ControlledPasswordInput } from "@/components/shared/form/inputFields";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { useForm } from "react-hook-form";
import { KeyRoundIcon } from "lucide-react";

export function AccountPasswordDetails() {
  const {
    control,

    formState: { isSubmitting, isDirty },
  } = useForm({
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  return (
    <Card size="sm" className="w-full md:max-w-2/3">
      <GeneralCardHeader title="Password" icon={<KeyRoundIcon />} />
      <CardContent>
        <form id="updatePassword" noValidate>
          <div className="flex flex-col gap-3">
            <ControlledPasswordInput
              control={control}
              name="currentPassword"
              label="Current password"
              autoComplete="current-password"
            />
            <ControlledPasswordInput
              control={control}
              name="newPassword"
              label="New password"
              autoComplete="new-password"
            />
            <ControlledPasswordInput
              control={control}
              name="confirmPassword"
              label="Confirm new password"
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
              Changing
            </>
          ) : (
            "Change password"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
