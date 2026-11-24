"use client";

import { eventDetailsAction } from "@/actions/dashboard";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import { useRouter } from "@/i18n/navigation";
import { type MissingField } from "@/lib/missingFields";
import { eventDetailsSchema, EventDetailsType } from "@/validation/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { FieldPath, useForm } from "react-hook-form";

// same look as the time inputs in the admin event form (no native picker icon)
const timeInputStyles =
  "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none";

type EventDetailsFormProps = {
  eventId: string;
  missing: MissingField[];
  defaultValues: EventDetailsType;
};

// Time and venue address of the selected event – after saving, back to the overview.
// With something missing, only those sections are open and the filled ones wait behind
// "Show other details" (still one form – hidden fields keep their values and get saved too).
export function EventDetailsForm({ eventId, missing, defaultValues }: EventDetailsFormProps) {
  const t = useTranslations("Dashboard.EventEdit");
  const { push } = useRouter();
  const schema = useMemo(() => eventDetailsSchema(t), [t]);
  // nothing missing (the client came to edit) – everything open from the start
  const [showAll, setShowAll] = useState(missing.length === 0);
  const showTime = showAll || missing.includes("hours");
  const showVenue = showAll || missing.includes("venueAddress");
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
        // an error can be in a hidden section – open everything so the client sees it
        setShowAll(true);
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
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5 md:max-w-2/3"
    >
      {showTime && (
        <Card size="sm">
          <GeneralCardHeader title={t("timeTitle")} icon={<ClockIcon />} />
          <CardContent className="flex flex-col gap-3 md:flex-row">
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
          </CardContent>
        </Card>
      )}

      {showVenue && (
        <Card size="sm">
          <GeneralCardHeader title={t("venueTitle")} icon={<MapPinIcon />} />
          <CardContent>
            <ControlledInput
              control={control}
              name="address"
              label={t("fields.address.label")}
              placeholder="ul. Długa 12, 31-146 Kraków"
              required
            />
          </CardContent>
        </Card>
      )}

      {/* the filled sections – one click away, the client can still change them */}
      {!showAll && (!showTime || !showVenue) && (
        <Button
          type="button"
          variant="outline"
          className="self-start"
          onClick={() => setShowAll(true)}
        >
          {t("showOther")}
          <ChevronDownIcon />
        </Button>
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
