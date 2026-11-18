import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { ContractDetails } from "@/data/contracts";
import { cn } from "@/lib/utils";
import { CheckIcon, ListChecksIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { SendDialog } from "./sendDialog";

const steps = ["created", "sent", "signed", "accepted"] as const;
const doneCountByStatus = { Draft: 1, Sent: 2, Signed: 3, Accepted: 4 } as const;

type StepState = "done" | "current" | "upcoming";

export async function ContractStepper({ fetchedData }: { fetchedData: ContractDetails }) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Contracts.Details.stepper");
  const { id, status, createdAt, sentAt } = fetchedData;

  const isCancelled = status === "Cancelled";
  const doneCount = isCancelled ? (sentAt ? 2 : 1) : doneCountByStatus[status];

  const dates: Partial<Record<(typeof steps)[number], Date | null>> = {
    created: createdAt,
    sent: sentAt,
  };

  function getState(index: number): StepState {
    if (index < doneCount) return "done";
    if (index === doneCount && !isCancelled) return "current";
    return "upcoming";
  }

  return (
    <Card size="md">
      <GeneralCardHeader title={t("title")} icon={<ListChecksIcon />} />
      <CardContent className="flex flex-col gap-4">
        {isCancelled && (
          <p className="text-destructive border-destructive/20 bg-destructive/5 rounded-md border px-3 py-2 text-[13px]">
            {t("cancelled")}
          </p>
        )}
        <ol className="flex flex-col">
          {steps.map((step, index) => {
            const state = getState(index);
            const date = dates[step];
            const isLast = index === steps.length - 1;

            return (
              <li key={step} className="flex flex-row gap-4">
                {/* Circle + line to the next step */}
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold",
                      state === "done" &&
                        "border-accent-foreground/40 bg-accent-foreground/15 text-accent-foreground",
                      state === "current" &&
                        "border-accent-foreground text-accent-foreground ring-accent-foreground/10 ring-4",
                      state === "upcoming" && "border-border-strong text-subtle-foreground",
                    )}
                  >
                    {state === "done" ? <CheckIcon size={16} strokeWidth={2.5} /> : index + 1}
                  </span>
                  {!isLast && (
                    <span
                      className={cn(
                        "my-1 min-h-6 w-px flex-1",
                        index < doneCount - 1 ? "bg-accent-foreground/50" : "bg-border-strong",
                      )}
                    />
                  )}
                </div>

                {/* Text */}
                <div className={cn("flex flex-col gap-1 pt-1", !isLast && "pb-6")}>
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      state === "upcoming" ? "text-subtle-foreground" : "text-foreground",
                    )}
                  >
                    {t(`steps.${step}.title`)}
                  </p>
                  {state === "done" && date && (
                    <p className="text-muted-foreground text-[13px]">
                      {format.dateTime(date, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                  {state === "current" && (
                    <p className="text-muted-foreground text-[13px]">
                      {t(`steps.${step}.current`)}
                    </p>
                  )}
                  {state === "current" && step === "sent" && (
                    <div className="pt-2">
                      <SendDialog contractId={id} />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
