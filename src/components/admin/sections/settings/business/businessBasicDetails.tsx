"use client";

import { Card, CardContent } from "@/components/ui/shadcn/card";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { useFormContext } from "react-hook-form";
import { BriefcaseIcon } from "lucide-react";
import { BusinessDetailsType } from "@/validation/settings";

export function BusinessBasicDetails() {
  const { control } = useFormContext<BusinessDetailsType>();

  return (
    <Card size="sm">
      <GeneralCardHeader title="Business" icon={<BriefcaseIcon />} />
      <CardContent className="flex flex-col gap-3">
        <ControlledInput
          control={control}
          name="businessName"
          label="Business name"
          placeholder="DJ Maven Events"
          required
        />
        <div className="flex flex-col gap-3 md:flex-row">
          <ControlledInput
            control={control}
            name="firstName"
            label="First name"
            placeholder="Jan"
            required
          />
          <ControlledInput
            control={control}
            name="lastName"
            label="Last name"
            placeholder="Kowalski"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
}
