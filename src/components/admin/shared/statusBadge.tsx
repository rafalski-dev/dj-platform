import { DotIcon } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";
import { cn } from "@/lib/utils";
import { ClientStatus } from "@/types/dashboard";
import { useTranslations } from "next-intl";

const statusStyles: Record<ClientStatus, string> = {
  New: "text-foreground/80 border-foreground/15 bg-foreground/5",
  Pending: "text-warning/80 border-warning/15 bg-warning/5",
  Active: "text-success/80 border-success/15 bg-success/5",
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
