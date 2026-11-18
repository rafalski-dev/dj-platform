import { DotIcon } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { InquiryStatus } from "../../../../generated";

const statusStyles: Record<InquiryStatus, string> = {
  New: "text-warning/80 border-warning/15 bg-warning/5",
  Accepted: "text-success/80 border-success/15 bg-success/5",
  Rejected: "text-muted-foreground/60 border-border bg-background",
};

export function InquiryStatusBadge({
  status,
  className,
}: {
  status: InquiryStatus;
  className?: string;
}) {
  const t = useTranslations("Admin.Inquiries.status");

  return (
    <Badge variant="outline" className={cn("pr-3", className, statusStyles[status])}>
      <DotIcon strokeWidth={8} />
      {t(status)}
    </Badge>
  );
}

// Another event already takes this date – shown while the inquiry waits for a decision
export function DateTakenBadge({ className }: { className?: string }) {
  const t = useTranslations("Admin.Inquiries.card");

  return (
    <Badge
      variant="outline"
      className={cn("text-destructive/80 border-destructive/20 bg-destructive/5 pr-3", className)}
    >
      <DotIcon strokeWidth={8} />
      {t("dateTaken")}
    </Badge>
  );
}
