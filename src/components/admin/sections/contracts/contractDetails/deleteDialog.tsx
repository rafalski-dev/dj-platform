"use client";

import { deleteContractAction } from "@/actions/contracts";
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
import { Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

type DialogButtonProps = { contractId: string; label: React.ReactNode };

export function DeleteDialog({ contractId, label }: DialogButtonProps) {
  const t = useTranslations("Admin.Contracts.Details.delete");
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  async function onDeleteButtonClick(id: string) {
    const result = await deleteContractAction(id);

    if (result.success) {
      toast.add({
        type: "success",
        title: t("toast.successTitle"),
        description: result.message,
        timeout: 7000,
      });
      push("/admin/contracts");
      return;
    }

    toast.add({
      type: "error",
      title: t("toast.errorTitle"),
      description: result.message,
      timeout: 7000,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/40 hover:border-destructive/60 hover:bg-destructive/10 flex-1 sm:flex-none"
          >
            {label}
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
            variant="destructive"
            onClick={() =>
              startTransition(async () => {
                await onDeleteButtonClick(contractId);
              })
            }
          >
            {isPending ? (
              <>
                <Spinner />
                {t("dialog.pending")}
              </>
            ) : (
              <>
                <Trash2Icon />
                {t("dialog.confirm")}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
