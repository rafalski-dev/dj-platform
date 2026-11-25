import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { cn } from "@/lib/utils";
import {
  DownloadIcon,
  FileClockIcon,
  FileSignatureIcon,
  FileTextIcon,
  UploadIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

// The contract from the DJ (download) and the signed one going back (upload).
// UI only for now – no download route or upload yet.
// ready – the DJ has sent the contract; before that both tiles are locked
export async function ContractCard({ ready }: { ready: boolean }) {
  const t = await getTranslations("Dashboard.Contract.card");

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
          {/* TODO: link to the download route once it exists */}
          <Button size="sm" disabled={!ready}>
            <DownloadIcon />
            {t("download.button")}
          </Button>
        </div>

        {/* 2. the signed contract going back to the DJ */}
        <div
          className={cn(
            "border-border-strong flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-4 text-center",
            !ready && "opacity-60",
          )}
        >
          <div className="text-accent-foreground bg-accent-foreground/10 flex size-12 items-center justify-center rounded-full">
            {ready ? <UploadIcon size={20} /> : <FileSignatureIcon size={20} />}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-serif text-xl leading-tight">{t("upload.title")}</p>
            <p className="text-muted-foreground text-sm font-light">
              {t(ready ? "upload.description" : "upload.locked")}
            </p>
            <p className="text-muted-foreground/70 text-xs">{t("upload.hint")}</p>
          </div>
          {/* TODO: file input + upload action */}
          <Button variant="outline" size="sm" disabled={!ready}>
            <UploadIcon />
            {t("upload.button")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
