"use client";

import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Separator } from "@/components/ui/shadcn/separator";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { useFormatter, useTranslations } from "next-intl";
import { useCreateEventContext } from "@/hooks/useCreateEventContext";
import { useFormContext, useFormState } from "react-hook-form";
import { SummaryItem } from "@/components/admin/shared/summaryRow";
import { CreateEventSchema } from "@/validation/events";

export function SummaryStep() {
  const t = useTranslations("Admin.Events.Form");
  const { setCurrentStep } = useCreateEventContext();
  const { getValues } = useFormContext<CreateEventSchema>();
  const { isSubmitting } = useFormState<CreateEventSchema>();
  const summaryValues = getValues();
  const format = useFormatter();

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <GeneralCardHeader title={t("steps.eventType")} onClick={() => setCurrentStep(1)} />
        <CardContent className="flex flex-col gap-3">
          <SummaryItem
            label={t("steps.eventType")}
            value={t(`eventTypes.${summaryValues.eventType.type}.title`)}
          />
          {summaryValues.eventType.type === "Other" && (
            <SummaryItem
              label={t("eventType.custom.label")}
              value={summaryValues.eventType.altType}
            />
          )}
        </CardContent>
      </Card>
      <Card>
        <GeneralCardHeader title={t("steps.basics")} onClick={() => setCurrentStep(2)} />
        <CardContent className="flex flex-col gap-3">
          <SummaryItem label={t("basics.client.label")} value={summaryValues.basics.client.label} />
          <SummaryItem label={t("basics.guests.label")} value={summaryValues.basics.guestCount} />
          <SummaryItem
            label={t("basics.eventTitle.label")}
            value={summaryValues.basics.eventTitle}
          />
          {summaryValues.eventType.type === "Wedding" && (
            <>
              <Separator />
              <SummaryItem
                label={t("basics.wedding.bride")}
                value={summaryValues.basics.wedding.bride}
              />
              <SummaryItem
                label={t("basics.wedding.groom")}
                value={summaryValues.basics.wedding.groom}
              />
              <Separator />
              <SummaryItem
                label={t("basics.wedding.brideWitness")}
                value={summaryValues.basics.wedding.brideWitness}
              />
              <SummaryItem
                label={t("basics.wedding.groomWitness")}
                value={summaryValues.basics.wedding.groomWitness}
              />
              <Separator />
              <SummaryItem
                label={t("summary.brideMother")}
                value={summaryValues.basics.wedding.brideMother}
              />
              <SummaryItem
                label={t("summary.brideFather")}
                value={summaryValues.basics.wedding.brideFather}
              />
              <SummaryItem
                label={t("summary.groomMother")}
                value={summaryValues.basics.wedding.groomMother}
              />
              <SummaryItem
                label={t("summary.groomFather")}
                value={summaryValues.basics.wedding.groomFather}
              />
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <GeneralCardHeader title={t("steps.dateAndPlace")} onClick={() => setCurrentStep(3)} />
        <CardContent className="flex flex-col gap-3">
          <SummaryItem
            label={t("summary.eventDate")}
            value={format.dateTime(summaryValues.dateAndPlace.eventDate, {
              dateStyle: "full",
            })}
          />
          <SummaryItem
            label={t("dateAndPlace.startsAt.label")}
            value={summaryValues.dateAndPlace.eventStartTime}
          />
          <SummaryItem
            label={t("dateAndPlace.endsAt.label")}
            value={summaryValues.dateAndPlace.eventEndTime}
          />
          <SummaryItem
            label={t("dateAndPlace.eventPlace.label")}
            value={summaryValues.dateAndPlace.eventPlace}
          />
          <SummaryItem
            label={t("dateAndPlace.address.label")}
            value={summaryValues.dateAndPlace.eventAddress}
          />
          {summaryValues.eventType.type === "Wedding" && (
            <>
              <Separator />
              <SummaryItem
                label={t("dateAndPlace.weddingKind.label")}
                value={
                  summaryValues.dateAndPlace.weddingKind &&
                  t(`dateAndPlace.weddingKind.options.${summaryValues.dateAndPlace.weddingKind}`)
                }
              />
              {summaryValues.dateAndPlace.weddingKind !== "None" && (
                <>
                  <SummaryItem
                    label={t("summary.ceremonyDate")}
                    value={
                      summaryValues.dateAndPlace.ceremonyDate &&
                      format.dateTime(summaryValues.dateAndPlace.ceremonyDate, {
                        dateStyle: "full",
                      })
                    }
                  />
                  <SummaryItem
                    label={t("summary.ceremonyStartTime")}
                    value={summaryValues.dateAndPlace.ceremonyStartTime}
                  />
                  {summaryValues.dateAndPlace.weddingKind !== "Outdoor" && (
                    <>
                      <SummaryItem
                        label={t("dateAndPlace.ceremonyPlace.label")}
                        value={summaryValues.dateAndPlace.ceremonyPlace}
                      />
                      <SummaryItem
                        label={t("summary.ceremonyAddress")}
                        value={summaryValues.dateAndPlace.ceremonyAddress}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <GeneralCardHeader title={t("steps.package")} onClick={() => setCurrentStep(4)} />
        <CardContent className="flex flex-col gap-3">
          <SummaryItem
            label={t("package.groups.package")}
            value={t(`package.packages.${summaryValues.package.eventPackage}.title`)}
          />
          {summaryValues.package.eventPackage === "Signature" && (
            <SummaryItem
              label={t("package.groups.addons")}
              value={summaryValues.package.addons
                .map((addon) => t(`package.addons.${addon}.title`))
                .join(", ")}
            />
          )}
          <Separator />
          <SummaryItem label={t("package.message.label")} value={summaryValues.package.message} />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={isSubmitting}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          {t("navigation.prev")}
        </Button>
        <Button size="sm" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner />
              {t("navigation.submitting")}
            </>
          ) : (
            t("navigation.submit")
          )}
        </Button>
      </div>
    </div>
  );
}
