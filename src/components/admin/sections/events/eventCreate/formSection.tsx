"use client";

import { useState } from "react";
import { EventType } from "./eventType";
import { FormSteps } from "./formSteps";
import { useTranslations } from "next-intl";

export function CreateEventForm() {
  const t = useTranslations("Admin.events");
  const [currentStep, setCurrentStep] = useState<number>(1);

  function nextStep(step: number) {
    setCurrentStep(step);
  }

  return (
    <div className="flex flex-col gap-5">
      <FormSteps currentStep={currentStep} nextStep={nextStep} />
      <form noValidate>
        {currentStep === 1 && <EventType />}
        {currentStep === 2 && "Basics"}
        {currentStep === 3 && "Date and place"}
        {currentStep === 4 && "Package"}
        {currentStep === 5 && "Summary"}
      </form>
    </div>
  );
}
