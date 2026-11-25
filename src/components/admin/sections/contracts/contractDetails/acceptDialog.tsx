"use client";

import { acceptContractAction } from "@/actions/contracts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/shadcn/alert-dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { toast } from "@/components/ui/shadcn/toast";
import { useRouter } from "@/i18n/navigation";
import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export function AcceptDialog({ contractId }: { contractId: string }) {
  const t = useTranslations("Admin.Contracts.Details.accept");
  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();

  async function onAcceptButtonClick() {
    const result = await acceptContractAction(contractId);

    toast.add({
      type: result.success ? "success" : "error",
      title: result.success ? t("toast.successTitle") : t("toast.errorTitle"),
      description: result.message,
      timeout: 7000,
    });

    // Reload the server data, so the stepper and the badge show the new status
    if (result.success) refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button size="sm">
            <CheckIcon />
            {t("button")}
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogTitle>{t("dialog.title")}</AlertDialogTitle>
        <AlertDialogDescription>{t("dialog.description")}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t("dialog.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => startTransition(onAcceptButtonClick)}
          >
            {isPending ? (
              <>
                <Spinner />
                {t("dialog.pending")}
              </>
            ) : (
              <>
                <CheckIcon />
                {t("dialog.confirm")}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
