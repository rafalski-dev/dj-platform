"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Pathname } from "@/types/navigation";
import { EllipsisIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Crumb = { label: string; path: Pathname };

export function Breadcrumbs({ dynamicLabel }: { dynamicLabel?: string }) {
  const t = useTranslations("Admin.Breadcrumbs");
  const pathname = usePathname();
  const segmentsArray = pathname.slice(1).split("/");

  function translateSegment(segment: string) {
    if (segment.startsWith("[")) return dynamicLabel ?? segment;
    return t.has(segment) ? t(segment) : segment;
  }

  const breadcrumbs = segmentsArray.map((segment, index) => {
    return {
      label: translateSegment(segment),
      path: ("/" + segmentsArray.slice(0, index + 1).join("/")) as Pathname,
    };
  });

  function checkLength(arry: Crumb[]): Crumb[] {
    if (arry.length >= 4) {
      return [arry[0], { label: "...", path: "/" }, arry.at(-2)!, arry.at(-1)!];
    }
    return arry;
  }

  const checkedPathnameArray = checkLength(breadcrumbs);

  return (
    <nav className="flex flex-row" aria-label={t("label")}>
      {checkedPathnameArray.map(({ label, path }, index) => {
        return (
          <div
            key={index}
            className="last:text-accent-foreground text-popover-foreground group flex flex-row items-end capitalize transition-colors"
          >
            {checkedPathnameArray.length !== index + 1 ? (
              label === "..." ? (
                <EllipsisIcon className="size-5" strokeWidth={1.5} />
              ) : (
                <Link
                  href={{
                    pathname: path,
                  }}
                  className="relative flex flex-row items-center"
                >
                  <span className="group-hover:text-accent-foreground duration-200">
                    {index !== 0 ? label : t("home")}
                  </span>
                </Link>
              )
            ) : (
              <div>{label}</div>
            )}

            {checkedPathnameArray.length !== index + 1 && <span className="px-3">/</span>}
          </div>
        );
      })}
    </nav>
  );
}
