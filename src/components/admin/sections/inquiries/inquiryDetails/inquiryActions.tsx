"use client";

import { acceptInquiryAction, rejectInquiryAction } from "@/actions/inquiries";
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
import { CheckIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

type InquiryActionsProps = { inquiryId: string; isDateTaken: boolean };

export function InquiryActions({ inquiryId, isDateTaken }: InquiryActionsProps) {
  return (
    <>
      <AcceptDialog inquiryId={inquiryId} disabled={isDateTaken} />
      <RejectDialog inquiryId={inquiryId} />
    </>
  );
}

function AcceptDialog({ inquiryId, disabled }: { inquiryId: string; disabled: boolean }) {
  const t = useTranslations("Admin.Inquiries.Details.accept");
  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();

  async function onAcceptClick() {
    const result = await acceptInquiryAction(inquiryId);

    toast.add({
      type: result.success ? "success" : "error",
      title: result.success ? t("toast.successTitle") : t("toast.errorTitle"),
      description: result.message,
      timeout: 7000,
    });

    // Reload the server data, so the status and the event link show up
    if (result.success) refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button size="sm" className="flex-1 sm:flex-none" disabled={disabled}>
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
          <AlertDialogAction disabled={isPending} onClick={() => startTransition(onAcceptClick)}>
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

function RejectDialog({ inquiryId }: { inquiryId: string }) {
  const t = useTranslations("Admin.Inquiries.Details.reject");
  const [isPending, startTransition] = useTransition();
  const { refresh } = useRouter();

  async function onRejectClick() {
    const result = await rejectInquiryAction(inquiryId);

    toast.add({
      type: result.success ? "success" : "error",
      title: result.success ? t("toast.successTitle") : t("toast.errorTitle"),
      description: result.message,
      timeout: 7000,
    });

    if (result.success) refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
            <XIcon />
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
            variant="destructive"
            disabled={isPending}
            onClick={() => startTransition(onRejectClick)}
          >
            {isPending ? (
              <>
                <Spinner />
                {t("dialog.pending")}
              </>
            ) : (
              <>
                <XIcon />
                {t("dialog.confirm")}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
