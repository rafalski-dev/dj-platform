"use client";

import { Card, CardContent } from "@/components/ui/shadcn/card";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { useFormContext } from "react-hook-form";
import { MailIcon } from "lucide-react";
import { BusinessDetailsType } from "@/validation/settings";

export function BusinessContactDetails() {
  const { control } = useFormContext<BusinessDetailsType>();

  return (
    <Card size="sm">
      <GeneralCardHeader title="Contact" icon={<MailIcon />} />
      <CardContent className="flex flex-col gap-3">
        <ControlledInput
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="hello@djmaven.pl"
          required
        />
        <ControlledInput
          control={control}
          name="phone"
          label="Phone"
          type="tel"
          placeholder="600 123 456"
        />
      </CardContent>
    </Card>
  );
}
