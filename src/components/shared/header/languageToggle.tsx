"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageToggle({ ariaLabel }: { ariaLabel: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "pl" ? "en" : "pl";

  return (
    <Button
      nativeButton={false}
      variant="secondary"
      size="icon-sm"
      className="text-foreground"
      aria-label={ariaLabel}
      render={<Link href={pathname} locale={other} />}
    >
      {other.toUpperCase()}
    </Button>
  );
}
