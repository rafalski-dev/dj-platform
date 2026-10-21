"use client";

import { MinusIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

export function SummaryItem({ label, value }: { label: string; value?: string }) {
  const t = useTranslations("Admin.Clients.Form.preview");
  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <dt className="text-popover-foreground shrink-0 text-[13.5px]">{label}</dt>
      <dd className="min-w-0 text-right wrap-break-word">
        {value || (
          <>
            <span className="sr-only">{t("notProvided")}</span>
            <MinusIcon size={20} strokeWidth={1.8} />
          </>
        )}
      </dd>
    </div>
  );
}

type SummaryRowProps = {
  label: string;
  name: string;
  formatValue?: (value: string) => string;
};

export function SummaryRow({ label, name, formatValue }: SummaryRowProps) {
  const { control } = useFormContext();
  const watchedValue = useWatch({ control, name: name });
  const value = watchedValue && formatValue ? formatValue(watchedValue) : watchedValue;
  return <SummaryItem label={label} value={value} />;
}
