import { Link } from "@/i18n/navigation";
import { Pathname } from "@/types/navigation";
import { buttonVariants } from "@/components/ui/button";
import { FilterType, PersistedParams } from "@/lib/searchParams";
import type { getTranslations } from "next-intl/server";

type FiltersProps = {
  t: Awaited<ReturnType<typeof getTranslations>>;
  pathname: Pathname;
  filters: { keyLabel: string; filterOption: FilterType }[];
  persistedParams: PersistedParams;
};

export function Filters({
  t,
  pathname,
  filters,
  persistedParams: { query, limit, filter },
}: FiltersProps) {
  return (
    <div className="flex flex-row gap-2">
      {filters.map(({ keyLabel, filterOption }, index: number) => {
        const buttonVariant = filterOption === filter ? "default" : "outline";
        return (
          <Link
            key={index}
            href={{
              pathname: pathname,
              query: { page: 1, filter: filterOption, query, limit },
            }}
            className={buttonVariants({ variant: buttonVariant, size: "sm" })}
          >
            {t(`filters.${keyLabel}`)}
          </Link>
        );
      })}
    </div>
  );
}
