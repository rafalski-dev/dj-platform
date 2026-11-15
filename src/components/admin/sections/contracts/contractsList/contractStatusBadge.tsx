import { DotIcon } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ContractStatus } from "../../../../../../generated";

const statusStyles: Record<ContractStatus, string> = {
  Draft: "text-foreground/80 border-foreground/15 bg-foreground/5",
  Sent: "text-warning/80 border-warning/15 bg-warning/5",
  Signed: "text-accent-foreground/90 border-accent-foreground/20 bg-accent-foreground/5",
  Accepted: "text-success/80 border-success/15 bg-success/5",
  Cancelled: "text-destructive/80 border-destructive/20 bg-destructive/5",
};

export function ContractStatusBadge({
  status,
  className,
}: {
  status: ContractStatus;
  className?: string;
}) {
  const t = useTranslations("Admin.Contracts.status");

  return (
    <Badge variant="outline" className={cn("pr-3", className, statusStyles[status])}>
      <DotIcon strokeWidth={8} />
      {t(status)}
    </Badge>
  );
}
