import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useCreateEventContext } from "@/hooks/useCreateEventContext";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { FormFieldset } from "../formFieldset";
import { ControlledDatePicker } from "@/components/shared/form/dateTimeField";
import { ClockIcon } from "lucide-react";
import { ControlledSelect } from "@/components/shared/form/selectField";
import { CreateEventSchema } from "@/validation/events";
import { WeddingKind } from "../../../../../../../generated";

export function DateAndPlaceStep() {
  const t = useTranslations("Admin.Events.Form");
  const { setCurrentStep } = useCreateEventContext();
  const { control, trigger } = useFormContext<CreateEventSchema>();
  const watchedValues = useWatch({ name: ["eventType.type", "dateAndPlace.weddingKind"] });
  const eventType = watchedValues[0];
  const weddingKind = watchedValues[1];
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <GeneralCardHeader title={t("steps.dateAndPlace")} />
        <CardContent className="flex flex-col gap-6">
          <FormFieldset title={t("dateAndPlace.groups.event")} className="md:grid-cols-1">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <div className="md:col-span-2">
                <ControlledDatePicker
                  name="dateAndPlace.eventDate"
                  control={control}
                  label={t("dateAndPlace.eventDate.label")}
                  placeholder={t("dateAndPlace.eventDate.placeholder")}
                />
              </div>
              <ControlledInput
                name="dateAndPlace.eventStartTime"
                control={control}
                type="time"
                label={t("dateAndPlace.startsAt.label")}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                icon={<ClockIcon />}
                align="inline-end"
              />
              <ControlledInput
                name="dateAndPlace.eventEndTime"
                control={control}
                type="time"
                label={t("dateAndPlace.endsAt.label")}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                icon={<ClockIcon />}
                align="inline-end"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <ControlledInput
                name="dateAndPlace.eventPlace"
                control={control}
                label={t("dateAndPlace.eventPlace.label")}
                placeholder={t("dateAndPlace.eventPlace.placeholder")}
              />
              <ControlledInput
                name="dateAndPlace.eventAddress"
                control={control}
                label={t("dateAndPlace.address.label")}
                placeholder={t("dateAndPlace.address.placeholder")}
              />
            </div>
          </FormFieldset>

          {eventType === "Wedding" && (
            <>
              <div className="border-t pt-6">
                <ControlledSelect
                  name="dateAndPlace.weddingKind"
                  control={control}
                  label={t("dateAndPlace.weddingKind.label")}
                  placeholder={t("dateAndPlace.weddingKind.placeholder")}
                  items={Object.values(WeddingKind).map((kind) => ({
                    label: t(`dateAndPlace.weddingKind.options.${kind}`),
                    value: kind,
                  }))}
                />
              </div>

              {weddingKind && weddingKind !== "None" && (
                <FormFieldset title={t("dateAndPlace.groups.ceremony")} className="md:grid-cols-1">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <ControlledDatePicker
                      name="dateAndPlace.ceremonyDate"
                      control={control}
                      label={t("dateAndPlace.eventDate.label")}
                      placeholder={t("dateAndPlace.ceremonyDate.placeholder")}
                    />
                    <ControlledInput
                      name="dateAndPlace.ceremonyStartTime"
                      control={control}
                      type="time"
                      label={t("dateAndPlace.startsAt.label")}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      icon={<ClockIcon />}
                      align="inline-end"
                    />
                  </div>
                  {weddingKind !== "Outdoor" && (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <ControlledInput
                        name="dateAndPlace.ceremonyPlace"
                        control={control}
                        label={t("dateAndPlace.ceremonyPlace.label")}
                        placeholder={t("dateAndPlace.ceremonyPlace.placeholder")}
                      />
                      <ControlledInput
                        name="dateAndPlace.ceremonyAddress"
                        control={control}
                        label={t("dateAndPlace.address.label")}
                        placeholder={t("dateAndPlace.address.placeholder")}
                      />
                    </div>
                  )}
                </FormFieldset>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep((prev) => prev - 1)}>
          {t("navigation.prev")}
        </Button>
        <Button
          size="sm"
          onClick={async () => {
            const isCorrect = await trigger("dateAndPlace");
            if (isCorrect) setCurrentStep((prev) => prev + 1);
          }}
        >
          {t("navigation.next")}
        </Button>
      </div>
    </div>
  );
}
