import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { useCreateEventContext } from "@/hooks/useCreateEventContext";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { FieldGroup } from "./fieldGroup";
import { ControlledDatePicker } from "@/components/shared/form/dateTimeField";
import { ClockIcon } from "lucide-react";

export function DateAndPlaceStep() {
  const t = useTranslations("Admin.Events.Form");
  const { setCurrentStep } = useCreateEventContext();
  const { control } = useFormContext();
  const type = useWatch({ name: "eventType.type" });

  return (
    <Card>
      <GeneralCardHeader title={t("steps.dateAndPlace")} />
      <CardContent className="flex flex-col gap-6">
        <FieldGroup title={t("dateAndPlace.groups.event")} className="md:grid-cols-1">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="md:col-span-2">
              <ControlledDatePicker
                name="dateAndPlace.eventDate"
                control={control}
                label={t("dateAndPlace.eventDate.label")}
                placeholder={t("dateAndPlace.eventDate.placeholder")}
                required
              />
            </div>
            <ControlledInput
              name="dateAndPlace.eventStartsAt"
              control={control}
              type="time"
              label={t("dateAndPlace.startsAt.label")}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              icon={<ClockIcon />}
              align="inline-end"
              required
            />
            <ControlledInput
              name="dateAndPlace.eventEndsAt"
              control={control}
              type="time"
              label={t("dateAndPlace.endsAt.label")}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              icon={<ClockIcon />}
              align="inline-end"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <ControlledInput
              name="dateAndPlace.eventPlace"
              control={control}
              label={t("dateAndPlace.eventPlace.label")}
              placeholder={t("dateAndPlace.eventPlace.placeholder")}
              required
            />
            <ControlledInput
              name="dateAndPlace.city"
              control={control}
              label={t("dateAndPlace.city.label")}
              placeholder={t("dateAndPlace.city.placeholder")}
              required
            />
          </div>
        </FieldGroup>

        {type === "Wedding" && (
          <div className="border-t pt-6">
            <FieldGroup title={t("dateAndPlace.groups.ceremony")} className="md:grid-cols-1">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <ControlledDatePicker
                  name="dateAndPlace.ceremonyDate"
                  control={control}
                  label={t("dateAndPlace.eventDate.label")}
                  placeholder={t("dateAndPlace.ceremonyDate.placeholder")}
                  required
                />
                <ControlledInput
                  name="dateAndPlace.ceremonyAt"
                  control={control}
                  type="time"
                  label={t("dateAndPlace.startsAt.label")}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  icon={<ClockIcon />}
                  align="inline-end"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <ControlledInput
                  name="dateAndPlace.ceremonyPlace"
                  control={control}
                  label={t("dateAndPlace.ceremonyPlace.label")}
                  placeholder={t("dateAndPlace.ceremonyPlace.placeholder")}
                  required
                />
                <ControlledInput
                  name="dateAndPlace.ceremonyCity"
                  control={control}
                  label={t("dateAndPlace.city.label")}
                  placeholder={t("dateAndPlace.city.placeholder")}
                  required
                />
              </div>
            </FieldGroup>
          </div>
        )}
      </CardContent>
      <CardFooter className="mx-(--card-spacing) flex justify-between border-t px-0">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep((prev) => prev - 1)}>
          {t("navigation.prev")}
        </Button>
        <Button size="sm" onClick={() => setCurrentStep((prev) => prev + 1)}>
          {t("navigation.next")}
        </Button>
      </CardFooter>
    </Card>
  );
}
