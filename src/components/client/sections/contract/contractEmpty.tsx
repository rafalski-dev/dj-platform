import { Alert, AlertDescription, AlertTitle } from "@/components/ui/shadcn/alert";
import { buttonVariants } from "@/components/ui/shadcn/button";
import type { ContractDetails as ContractDetailsType } from "@/data/dashboard";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, FileClockIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContractCard } from "./contractCard";
import { ContractDetails } from "./contractDetails";

// No contract yet for the selected event – the contract card is locked and, with an event
// selected, what will go into the contract is shown so the client can check it
export async function ContractEmpty({ details }: { details: ContractDetailsType | null }) {
  const t = await getTranslations("Dashboard.Contract.empty");

  return (
    <div className="flex flex-col items-start gap-5">
      {/* same look as the overview alert */}
      <Alert className="border-accent/30 bg-accent/5 text-accent-foreground rounded-xl px-4 py-3">
        <FileClockIcon />
        <AlertTitle>{t("alert.title")}</AlertTitle>
        <AlertDescription>{t("alert.description")}</AlertDescription>
      </Alert>
      <div className="w-full">
        <ContractCard ready={false} />
      </div>
      {details && (
        <div className="w-full">
          <ContractDetails details={details} />
        </div>
      )}
      <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
        <ArrowLeftIcon />
        {t("back")}
      </Link>
    </div>
  );
}
