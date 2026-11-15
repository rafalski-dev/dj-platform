"use client";

import { Card, CardContent } from "@/components/ui/shadcn/card";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { useFormContext } from "react-hook-form";
import { MapPinIcon } from "lucide-react";
import { BusinessDetailsType } from "@/validation/settings";

export function BusinessAddressDetails() {
  const { control } = useFormContext<BusinessDetailsType>();

  return (
    <Card size="sm">
      <GeneralCardHeader title="Business address" icon={<MapPinIcon />} />
      <CardContent className="flex flex-col gap-3">
        <ControlledInput
          control={control}
          name="streetAndNumber"
          label="Street and number"
          placeholder="ul. Długa 12/4"
          required
        />
        <div className="flex flex-col gap-3 md:flex-row">
          <ControlledInput
            control={control}
            name="postcode"
            label="Postcode"
            placeholder="00-001"
            required
          />
          <ControlledInput
            control={control}
            name="city"
            label="City"
            placeholder="Warszawa"
            required
          />
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <ControlledInput
            control={control}
            name="region"
            label="Region"
            placeholder="Mazowieckie"
          />
          <ControlledInput control={control} name="country" label="Country" placeholder="Polska" />
        </div>
      </CardContent>
    </Card>
  );
}
