"use client";

import { useMemo, useState } from "react";
import { FormSteps } from "./steps/formSteps";
import { FormProvider, useForm } from "react-hook-form";
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

type CreateEventFormProps = {
  clientsList: Pick<Client, "id" | "name">[];
};

export function CreateEventForm({ clientsList }: CreateEventFormProps) {
  const t = useTranslations("Admin.Events.Form");

  const [currentStep, setCurrentStep] = useState<number>(1);
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
  const { handleSubmit } = methods;

  function onSubmit(data: CreateEventSchema) {
    console.log(data);
  }

  return (
    <CreateEventContext.Provider value={{ currentStep, setCurrentStep }}>
      <FormProvider {...methods}>
        <div className="flex flex-col gap-5">
          <FormSteps />
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
