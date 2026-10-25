import { Link } from "@/i18n/navigation";
import { PersistedParams } from "@/lib/searchParams";
import { cn } from "@/lib/utils";
import { Pathname } from "@/types/navigation";
import { useTranslations } from "next-intl";

export function RowsPerPage({
  limitsOption,
  pathname,
  persistedParams: { limit, query, filter },
}: {
  limitsOption: readonly number[];
  pathname: Pathname;
  persistedParams: PersistedParams;
}) {
  const t = useTranslations("Admin.Pagination");

  return (
    <div className="my-auto flex items-center gap-3">
      <p className="text-muted-foreground hidden text-[13px] md:block">{t("perPage")}</p>
      <div className="bg-secondary border-border flex flex-row gap-px rounded-sm border p-1">
        {limitsOption.map((rows) => {
          return (
            <Link
              className={cn(
                "text-popover-foreground/80 hover:text-muted-foreground rounded-sm px-2 py-0.5 text-[13px] duration-200",
                rows === limit && "bg-accent-foreground/10 text-accent-foreground",
              )}
              key={rows}
              href={{
                pathname: pathname,
                query: { limit: rows, page: 1, query, filter },
              }}
              scroll={false}
            >
              {rows}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
