"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePathname, getPathname } from "@/i18n/navigation";

export function LanguageToggle({ ariaLabel }: { ariaLabel: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "pl" ? "en" : "pl";
  const href = getPathname({ href: pathname, locale: other });

  return (
    <Button
      nativeButton={false}
      variant="secondary"
      size="icon-sm"
      className="text-foreground"
      aria-label={ariaLabel}
      render={<a href={href} />}
    >
      {other.toUpperCase()}
    </Button>
  );
}
