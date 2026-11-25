import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { cn } from "@/lib/utils";
import type { ContractStatus } from "../../../../../generated";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";
import {
  DownloadIcon,
  FileCheckIcon,
  FileClockIcon,
  FileSignatureIcon,
  FileTextIcon,
  UploadIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContractUploadButton } from "./contractUploadButton";

// The contract from the DJ (download) and the signed one going back (upload).
// ready – the DJ has sent the contract; before that both tiles are locked
// signedAt – the client has sent the signed copy; status Accepted – the DJ confirmed it (no more changes)
export async function ContractCard({
  ready,
  contractId,
  status,
  signedAt,
}: {
  ready: boolean;
  contractId?: string | null;
  status?: ContractStatus;
  signedAt?: Date | null;
}) {
  const t = await getTranslations("Dashboard.Contract.card");
  const canUpload = ready && contractId && (status === "Sent" || status === "Signed");

  return (
    <Card size="md" className="ring-border-strong gap-4">
      <CardHeader>
        <h2 className="flex items-center gap-2.5 text-[24px]">
          <span className="text-accent-foreground [&>svg]:size-5" aria-hidden="true">
            <FileTextIcon />
          </span>
          {t("title")}
        </h2>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 1. the contract from the DJ – mirrors the upload tile; dashed and dimmed until it exists */}
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-xl border p-4 text-center",
            ready ? "bg-foreground/5" : "border-border-strong border-dashed opacity-60",
          )}
        >
          <div className="text-accent-foreground bg-accent-foreground/10 flex size-12 items-center justify-center rounded-full">
            {ready ? <FileTextIcon size={20} /> : <FileClockIcon size={20} />}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-serif text-xl leading-tight">
              {t(ready ? "download.title" : "download.emptyTitle")}
            </p>
            <p className="text-muted-foreground text-sm font-light">
              {t(ready ? "download.ready" : "download.waiting")}
            </p>
          </div>
          {/* an <a> can't be disabled – a real link only once the contract exists */}
          {ready && contractId ? (
            <a
              className={buttonVariants({ variant: "default", size: "sm" })}
              href={`/api/contracts/${contractId}/download`}
            >
              <DownloadIcon />
              {t("download.button")}
            </a>
          ) : (
            <Button size="sm" disabled>
              <DownloadIcon />
              {t("download.button")}
            </Button>
          )}
        </div>

        {/* 2. the signed contract going back to the DJ */}
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-xl border p-4 text-center",
            signedAt ? "bg-foreground/5" : "border-border-strong border-dashed",
            !ready && "opacity-60",
          )}
        >
          <div className="text-accent-foreground bg-accent-foreground/10 flex size-12 items-center justify-center rounded-full">
            {signedAt ? (
              <FileCheckIcon size={20} />
            ) : ready ? (
              <UploadIcon size={20} />
            ) : (
              <FileSignatureIcon size={20} />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-serif text-xl leading-tight">
              {t(signedAt ? "upload.sentTitle" : "upload.title")}
            </p>
            <p className="text-muted-foreground text-sm font-light">
              {signedAt
                ? t(status === "Accepted" ? "upload.accepted" : "upload.sent", {
                    date: format(new TZDate(signedAt, "Europe/Warsaw"), "dd.MM.yyyy"),
                  })
                : t(ready ? "upload.description" : "upload.locked")}
            </p>
            {!signedAt && <p className="text-muted-foreground/70 text-xs">{t("upload.hint")}</p>}
          </div>
          {canUpload ? (
            <ContractUploadButton contractId={contractId} replace={!!signedAt} />
          ) : (
            !signedAt && (
              <Button variant="outline" size="sm" disabled>
                <UploadIcon />
                {t("upload.button")}
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
