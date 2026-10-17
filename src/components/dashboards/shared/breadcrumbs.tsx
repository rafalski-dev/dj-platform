"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Pathname } from "@/types/navigation";
import { EllipsisIcon } from "lucide-react";

type Crumb = { label: string; path: Pathname };

export function Breadcrumbs() {
  const pathname = usePathname();
  const segmentsArray = pathname.slice(1).split("/");
  const breadcrumbs = segmentsArray.map((segment, index) => {
    return {
      label: segment,
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
    <nav className="flex flex-row" aria-label="Breadcrumbs">
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
                    {index !== 0 ? label : "Home"}
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
