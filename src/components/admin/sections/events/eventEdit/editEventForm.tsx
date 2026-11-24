"use client";

import { useMemo, useState } from "react";
import { FieldPath, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { TZDate } from "@date-fns/tz";
import { CreateEventContext } from "@/context/eventContext";
import { CreateEventSchema, createEventSchema } from "@/validation/events";
import { editEventAction } from "@/actions/events";
import type { EventToEdit } from "@/data/events";
import { useRouter } from "@/i18n/navigation";
import { toWarsawTime } from "@/lib/utils";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/shadcn/alert-dialog";
import { Client } from "../../../../../../generated";
import { FormSteps } from "../eventCreate/steps/formSteps";
import { EventTypeStep } from "../eventCreate/steps/eventTypeStep";
import { BasicsStep } from "../eventCreate/steps/basicsStep";
import { DateAndPlaceStep } from "../eventCreate/steps/dateAndPlaceStep";
import { PackageStep } from "../eventCreate/steps/packageStep";
import { SummaryStep } from "../eventCreate/steps/summaryStep";

type EditEventFormProps = {
  fetchedData: EventToEdit;
  clientsList: Pick<Client, "id" | "name">[];
};

// The event date is stored as a calendar day (UTC midnight) – turn it into a local Date for the picker.
function toPickerDate(date: Date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function toWarsawDay(date: Date) {
  const warsaw = new TZDate(date, "Europe/Warsaw");
  return new Date(warsaw.getFullYear(), warsaw.getMonth(), warsaw.getDate());
}

export function EditEventForm({ fetchedData, clientsList }: EditEventFormProps) {
  const t = useTranslations("Admin.Events.Form");
  const tEdit = useTranslations("Admin.Events.Edit");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { push } = useRouter();
  const schema = useMemo(() => createEventSchema(t), [t]);

  const eventId = fetchedData.id;
  const wedding = fetchedData.wedding;

  const methods = useForm<CreateEventSchema>({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      eventType: { type: fetchedData.type, altType: fetchedData.altType ?? "" },
      basics: {
        client: { label: fetchedData.client.name, value: fetchedData.client.id },
        guestCount: fetchedData.guestCount?.toString() ?? "",
        eventTitle: fetchedData.name,
        wedding: {
          bride: wedding?.bride ?? "",
          groom: wedding?.groom ?? "",
          brideWitness: wedding?.brideWitness ?? "",
          groomWitness: wedding?.groomWitness ?? "",
          brideMother: wedding?.brideMother ?? "",
          brideFather: wedding?.brideFather ?? "",
          groomMother: wedding?.groomMother ?? "",
          groomFather: wedding?.groomFather ?? "",
        },
      },
      dateAndPlace: {
        eventDate: toPickerDate(fetchedData.date),
        // empty when the event came from an inquiry – the admin fills it in here
        eventStartTime: fetchedData.startsAt ? toWarsawTime(fetchedData.startsAt) : "",
        eventEndTime: fetchedData.endsAt ? toWarsawTime(fetchedData.endsAt) : "",
        eventPlace: fetchedData.place,
        eventAddress: fetchedData.address ?? "",
        weddingKind: wedding?.weddingKind,
        ceremonyDate: wedding?.ceremonyStartsAt ? toWarsawDay(wedding.ceremonyStartsAt) : undefined,
        ceremonyStartTime: wedding?.ceremonyStartsAt ? toWarsawTime(wedding.ceremonyStartsAt) : "",
        ceremonyPlace: wedding?.ceremonyPlace ?? "",
        ceremonyAddress: wedding?.ceremonyAddress ?? "",
      },
      package: {
        eventPackage: fetchedData.package ?? undefined,
        addons: fetchedData.addons,
        message: fetchedData.message ?? "",
      },
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(formData: CreateEventSchema, allowSameDay = false) {
    const response = await editEventAction(formData, eventId, allowSameDay);

    if (response.status === "conflict") {
      setDialogOpen(true);
      return;
    }

    if (response.success) {
      toast.add({
        type: "success",
        title: tEdit("toast.successTitle"),
        description: response.message,
      });
      push({ pathname: "/admin/events/[eventId]", params: { eventId } });
      return;
    }

    toast.add({ type: "error", title: tEdit("toast.errorTitle"), description: response.message });
    setDialogOpen(false);

    if (response.errors) {
      Object.entries(response.errors).forEach(([key, message]) =>
        setError(key as FieldPath<CreateEventSchema>, { message }),
      );
    }
  }

  return (
    <CreateEventContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        cancelHref: { pathname: "/admin/events/[eventId]", params: { eventId } },
        submitLabel: tEdit("submit"),
      }}
    >
      <FormProvider {...methods}>
        <div className="flex flex-col gap-5">
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("conflict.title")}</AlertDialogTitle>
                <AlertDialogDescription>{t("conflict.description")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isSubmitting} size="sm">
                  {t("navigation.cancel")}
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={isSubmitting}
                  onClick={handleSubmit((data) => onSubmit(data, true))}
                  size="sm"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      {t("navigation.submitting")}
                    </>
                  ) : (
                    tEdit("submit")
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <FormSteps />
          <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
            {currentStep === 1 && <EventTypeStep />}
            {currentStep === 2 && <BasicsStep clientsList={clientsList} />}
            {currentStep === 3 && <DateAndPlaceStep />}
            {currentStep === 4 && <PackageStep />}
            {currentStep === 5 && <SummaryStep />}
          </form>
        </div>
      </FormProvider>
    </CreateEventContext.Provider>
  );
}
