"use client";

import { eventDetailsAction } from "@/actions/dashboard";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Field, FieldLabel } from "@/components/ui/shadcn/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/shadcn/input-group";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import { useRouter } from "@/i18n/navigation";
import { eventDetailsSchema, EventDetailsType } from "@/validation/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  ChurchIcon,
  ClockIcon,
  HeartIcon,
  HotelIcon,
  MapPinIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useMemo, type ReactNode } from "react";
import { FieldPath, useForm } from "react-hook-form";

// same look as the time inputs in the admin event form (no native picker icon)
const timeInputStyles =
  "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none";

type EventDetailsFormProps = {
  eventId: string;
  defaultValues: EventDetailsType;
  // shown, not editable – the DJ has already confirmed them (dates already formatted)
  confirmed: {
    date: string;
    place: string;
    // only a wedding with a ceremony
    ceremony?: { date: string };
  };
};

// Time and place address of the selected event (and its ceremony) – after saving, back to the overview
export function EventDetailsForm({ eventId, defaultValues, confirmed }: EventDetailsFormProps) {
  const t = useTranslations("Dashboard.EventEdit");
  const { push } = useRouter();
  const schema = useMemo(() => eventDetailsSchema(t), [t]);
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty },
  } = useForm<EventDetailsType>({ defaultValues, resolver: zodResolver(schema) });

  async function onSubmit(formData: EventDetailsType) {
    const response = await eventDetailsAction(eventId, formData);

    if (!response.success) {
      toast.add({ type: "error", title: t("notSaved"), description: response.message });

      if (response.errors) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as FieldPath<EventDetailsType>, { message });
        });
      }
      return;
    }

    toast.add({ type: "success", title: response.message });
    push("/dashboard");
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <Card size="sm">
        <GeneralCardHeader title={t("eventTitle")} icon={<CalendarIcon />} />
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <ReadOnlyInput
              label={t("fields.date.label")}
              value={confirmed.date}
              icon={<CalendarIcon />}
            />
            <ControlledInput
              control={control}
              name="startTime"
              type="time"
              label={t("fields.startTime.label")}
              className={timeInputStyles}
              icon={<ClockIcon />}
              align="inline-end"
              required
            />
            <ControlledInput
              control={control}
              name="endTime"
              type="time"
              label={t("fields.endTime.label")}
              className={timeInputStyles}
              icon={<ClockIcon />}
              align="inline-end"
              required
            />
          </div>
          <ReadOnlyInput
            label={t("fields.place.label")}
            value={confirmed.place}
            icon={<HotelIcon />}
          />
          <ControlledInput
            control={control}
            name="address"
            label={t("fields.address.label")}
            placeholder="ul. Długa 12, 31-146 Kraków"
            icon={<MapPinIcon />}
            align="inline-end"
            required
          />
        </CardContent>
      </Card>

      {confirmed.ceremony && (
        <Card size="sm">
          <GeneralCardHeader title={t("ceremonyTitle")} icon={<HeartIcon />} />
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 md:flex-row">
              <ReadOnlyInput
                label={t("fields.date.label")}
                value={confirmed.ceremony.date}
                icon={<CalendarIcon />}
              />
              <ControlledInput
                control={control}
                name="ceremony.startTime"
                type="time"
                label={t("fields.startTime.label")}
                className={timeInputStyles}
                icon={<ClockIcon />}
                align="inline-end"
                required
              />
            </div>
            <ControlledInput
              control={control}
              name="ceremony.place"
              label={t("fields.ceremonyPlace.label")}
              placeholder="Kościół św. Anny"
              icon={<ChurchIcon />}
              align="inline-end"
              required
            />
            <ControlledInput
              control={control}
              name="ceremony.address"
              label={t("fields.ceremonyAddress.label")}
              placeholder="ul. Kościelna 1, 31-146 Kraków"
              icon={<MapPinIcon />}
              align="inline-end"
              required
            />
          </CardContent>
        </Card>
      )}

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

// Looks like the inputs next to it, but it's not part of the form – only the DJ changes it
function ReadOnlyInput({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput id={id} value={value} readOnly disabled />
        <InputGroupAddon align="inline-end">{icon}</InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
