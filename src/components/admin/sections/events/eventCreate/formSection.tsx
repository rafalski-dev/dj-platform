"use client";

import { useMemo, useState } from "react";
import { FormSteps } from "./steps/formSteps";
import { FieldPath, FormProvider, useForm } from "react-hook-form";
import { CreateEventContext } from "@/context/eventContext";
import { CreateEventSchema, createEventSchema } from "@/validation/events";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateAndPlaceStep } from "./steps/dateAndPlaceStep";
import { useTranslations } from "next-intl";
import { SummaryStep } from "./steps/summaryStep";
import { Client } from "../../../../../../generated";
import { BasicsStep } from "./steps/basicsStep";
import { PackageStep } from "./steps/packageStep";
import { EventTypeStep } from "./steps/eventTypeStep";
import { createEventAction } from "@/actions/events";
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
import { useRouter } from "@/i18n/navigation";

type CreateEventFormProps = {
  clientsList: Pick<Client, "id" | "name">[];
};

export function CreateEventForm({ clientsList }: CreateEventFormProps) {
  const t = useTranslations("Admin.Events.Form");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { push } = useRouter();
  const schema = useMemo(() => createEventSchema(t), [t]);

  const methods = useForm<CreateEventSchema>({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      eventType: { altType: "" },
      basics: {
        guestCount: "",
        eventTitle: "",
        wedding: {
          bride: "",
          groom: "",
          brideWitness: "",
          groomWitness: "",
          brideMother: "",
          brideFather: "",
          groomMother: "",
          groomFather: "",
        },
      },
      dateAndPlace: {
        eventStartTime: "",
        eventEndTime: "",
        eventPlace: "",
        eventAddress: "",
        ceremonyStartTime: "",
        ceremonyPlace: "",
        ceremonyAddress: "",
      },
      package: { addons: [], message: "" },
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(formData: CreateEventSchema, allowSameDay = false) {
    const response = await createEventAction(formData, allowSameDay);

    if (response.status === "conflict") {
      setDialogOpen(true);
      return;
    }

    if (response.success) {
      toast.add({ type: "success", title: t("toast.successTitle"), description: response.message });
      push({ pathname: "/admin/events" });
    }

    if (!response.success) {
      toast.add({ type: "error", title: t("toast.errorTitle"), description: response.message });
      setDialogOpen(false);
    }

    if (response.errors) {
      Object.entries(response.errors).forEach(([key, message]) =>
        setError(key as FieldPath<CreateEventSchema>, { message }),
      );
    }
  }

  return (
    <CreateEventContext.Provider value={{ currentStep, setCurrentStep }}>
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
                    t("navigation.submit")
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
