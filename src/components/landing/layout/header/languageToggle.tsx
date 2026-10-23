"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import { usePathname, getPathname } from "@/i18n/navigation";

export function LanguageToggle({ ariaLabel }: { ariaLabel: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const other = locale === "pl" ? "en" : "pl";
  // @ts-expect-error -- params always match the current pathname
  const href = getPathname({ href: { pathname, params }, locale: other });

  return (
    <Button
      nativeButton={false}
      variant="secondary"
      size="icon"
      className="text-foreground [&_svg:not([class*='size-'])]:size-4.5"
      aria-label={ariaLabel}
      render={<a href={href} />}
    >
      {other.toUpperCase()}
    </Button>
  );
}
