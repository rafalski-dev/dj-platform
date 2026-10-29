import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useCreateEventContext } from "@/hooks/useCreateEventContext";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { CreateEventSchema } from "@/validation/events";

type StepStatus = "completed" | "active" | "standard";

type Step = { id: number; key: string; value: keyof CreateEventSchema | "summary" };

const steps: Step[] = [
  { id: 1, key: "eventType", value: "eventType" },
  { id: 2, key: "basics", value: "basics" },
  { id: 3, key: "dateAndPlace", value: "dateAndPlace" },
  { id: 4, key: "package", value: "package" },
  { id: 5, key: "summary", value: "summary" },
];

export function FormSteps() {
  const t = useTranslations("Admin.Events.Form");
  const { currentStep, setCurrentStep } = useCreateEventContext();
  const { trigger } = useFormContext<CreateEventSchema>();

  const currentKey = steps.find(({ id }) => id === currentStep)?.key ?? steps[0].key;

  async function goToStep(id: number) {
    if (id <= currentStep) return setCurrentStep(id);

    for (const step of steps.filter((step) => step.id < id)) {
      if (step.value === "summary") continue;
      const isValid = await trigger(step.value);
      if (!isValid) return setCurrentStep(step.id);
    }

    setCurrentStep(id);
  }

  function buttonStatus(id: number): StepStatus {
    if (id < currentStep) return "completed";
    if (id === currentStep) return "active";
    return "standard";
  }

  return (
    <Card>
      <GeneralCardHeader
        title={t(`steps.${currentKey}`)}
        label={t("stepCounter", {
          currentStep: currentStep,
          allSteps: steps.length,
        })}
        orientation="horizontal"
      />
      <CardContent>
        <ol className="flex justify-between">
          {steps.map(({ id, key, value }) => {
            return (
              <li key={value} className="group flex flex-1 items-center last:flex-none">
                <StepButton
                  onClick={() => goToStep(id)}
                  status={buttonStatus(id)}
                  label={`${id}. ${t(`steps.${key}`)}`}
                >
                  {id}
                </StepButton>
                <div
                  aria-hidden="true"
                  className={cn(
                    "mx-1 h-px w-full transition-colors duration-200 group-last:hidden md:mx-3",
                    id < currentStep ? "bg-gold-light/60" : "bg-border",
                  )}
                />
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}

const statusClassname: Record<StepStatus, string> = {
  completed:
    "from-gold-light to-gold-dark text-primary-foreground border-transparent bg-linear-120",
  active:
    "border-gold-light/50 bg-primary/8 text-accent-foreground ring-primary/8 font-semibold ring-3",
  standard: "bg-background/60 text-muted-foreground hover:border-primary/30",
};

type StepButtonProps = {
  children: React.ReactNode;
  className?: string;
  status: StepStatus;
  label: string;
  onClick: () => void;
};

export function StepButton({ children, className, status, label, ...rest }: StepButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={status === "active" ? "step" : undefined}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-sm border text-sm transition-[background-color,border-color,box-shadow,color] duration-200 ease-out",
        statusClassname[status],
        className,
      )}
      {...rest}
    >
      {status === "completed" ? <CheckIcon size={16} strokeWidth={2.5} /> : children}
    </button>
  );
}
