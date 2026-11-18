import { Link } from "@/i18n/navigation";
import { Href, Pathname } from "@/types/navigation";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { FilterType, PersistedParams } from "@/lib/searchParams";
import type { getTranslations } from "next-intl/server";

// Generic over the filter values, so clients and inquiries can each use their own
type FiltersProps<TFilter extends string | undefined> = {
  t: Awaited<ReturnType<typeof getTranslations>>;
  pathname: Pathname;
  filters: { keyLabel: string; value: TFilter }[];
  persistedParams: PersistedParams<TFilter>;
};

export function Filters<TFilter extends string | undefined = FilterType>({
  t,
  pathname,
  filters,
  persistedParams: { query, limit, filter },
}: FiltersProps<TFilter>) {
  return (
    <div className="flex flex-row flex-wrap justify-between gap-3 md:flex-nowrap">
      {filters.map(({ keyLabel, value }, index: number) => {
        const buttonVariant = value === filter ? "default" : "outline";
        return (
          <Link
            key={index}
            href={
              {
                pathname: pathname,
                query: { page: 1, filter: value, query, limit },
              } as Href
            }
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
