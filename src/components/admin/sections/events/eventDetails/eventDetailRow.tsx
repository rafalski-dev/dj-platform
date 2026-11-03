import { MinusIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type EventDetailRowProps = {
  label: string;
  children: React.ReactNode;
};

export function EventDetailRow({ label, children }: EventDetailRowProps) {
  const t = useTranslations("Admin.Events.card");

  return (
    <div className="flex justify-between gap-3 border-t py-3">
      <dt className="text-muted-foreground/80">{label}</dt>
      <dd className="text-right wrap-anywhere">
        {children || (
          <>
            <span className="sr-only">{t("notSet")}</span>
            <MinusIcon className="text-popover-foreground" strokeWidth={1.6} />
          </>
        )}
      </dd>
    </div>
  );
}
