"use client";

import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import { useCreateEventContext } from "@/hooks/useCreateEventContext";
import { Link } from "@/i18n/navigation";
import { useFormContext, useWatch } from "react-hook-form";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { EventTypeField } from "../eventTypeField";
import { CreateEventSchema } from "@/validation/events";

export function EventTypeStep() {
  const t = useTranslations("Admin.Events.Form");
  const { setCurrentStep } = useCreateEventContext();
  const { control, trigger } = useFormContext<CreateEventSchema>();
  const type = useWatch({ name: "eventType.type" });

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <GeneralCardHeader title={t("steps.eventType")} />
        <CardContent>
          <EventTypeField />
          {type === "Other" && (
            <ControlledInput
              name="eventType.altType"
              control={control}
              label={t("eventType.custom.label")}
              placeholder={t("eventType.custom.placeholder")}
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Link
          href={{ pathname: "/admin/events" }}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {t("navigation.cancel")}
        </Link>
        <Button
          size="sm"
          onClick={async () => {
            if (await trigger("eventType")) setCurrentStep((prev) => prev + 1);
          }}
        >
          {t("navigation.next")}
        </Button>
      </div>
    </div>
  );
}
