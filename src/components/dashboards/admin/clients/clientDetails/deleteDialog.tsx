"use client";

import { deleteClientAction } from "@/actions/clients";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useRouter } from "@/i18n/navigation";
import { Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

type DialogButtonProps = { clientId: string; label: React.ReactNode };

export function DeleteDialog({ clientId, label }: DialogButtonProps) {
  const t = useTranslations("Admin.Clients.Details.delete");
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  async function onDeleteButtonClick(id: string) {
    const result = await deleteClientAction(id);

    if (result.success) {
      toast.add({
        type: "success",
        title: t("toast.successTitle"),
        description: result.message,
        timeout: 7000,
      });
      push("/admin/clients");
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
          <Button variant="outline" className="flex-1 md:w-full">
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
                await onDeleteButtonClick(clientId);
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
