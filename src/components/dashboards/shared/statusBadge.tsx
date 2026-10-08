import { DotIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ClientStatus } from "@/types/dashboard";
import { useTranslations } from "next-intl";

const statusStyles: Record<ClientStatus, string> = {
  New: "text-foreground/80 border-foreground/15 bg-foreground/5",
  Pending:
    "text-amber-600 border-amber-600/20 bg-amber-500/10 dark:text-amber-400/80 dark:border-amber-400/15 dark:bg-amber-400/5",
  Active:
    "text-emerald-700 border-emerald-600/25 bg-emerald-500/10 dark:text-emerald-400/80 dark:border-emerald-400/15 dark:bg-emerald-400/5",
  Completed: "text-muted-foreground/80 border-muted-foreground/15 bg-muted-foreground/5",
  Cancelled: "text-destructive/80 border-destructive/20 bg-destructive/5",
  Archived: "text-muted-foreground/60 border-border bg-background",
};

export function StatusBadge({ status, className }: { status: ClientStatus; className?: string }) {
  const t = useTranslations("Admin.StatusBadge");

  return (
    <Badge variant="outline" className={cn("pr-3", className, statusStyles[status])}>
      <DotIcon strokeWidth={8} />
      {t(status)}
    </Badge>
  );
}
