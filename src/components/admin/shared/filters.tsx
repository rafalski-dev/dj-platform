import { Link } from "@/i18n/navigation";
import { Pathname } from "@/types/navigation";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { FilterType, PersistedParams } from "@/lib/searchParams";
import type { getTranslations } from "next-intl/server";

type FiltersProps = {
  t: Awaited<ReturnType<typeof getTranslations>>;
  pathname: Pathname;
  filters: { keyLabel: string; value: FilterType }[];
  persistedParams: PersistedParams;
};

export function Filters({
  t,
  pathname,
  filters,
  persistedParams: { query, limit, filter },
}: FiltersProps) {
  return (
    <div className="flex flex-row flex-wrap justify-between gap-3 md:flex-nowrap">
      {filters.map(({ keyLabel, value }, index: number) => {
        const buttonVariant = value === filter ? "default" : "outline";
        return (
          <Link
            key={index}
            href={{
              pathname: pathname,
              query: { page: 1, filter: value, query, limit },
            }}
            className={buttonVariants({
              variant: buttonVariant,
              size: "sm",
              className: "h-11 flex-1",
            })}
          >
            {t(`filters.${keyLabel}`)}
          </Link>
        );
      })}
    </div>
  );
}
