import { Link } from "@/i18n/navigation";
import { PersistedParams, ROWS_PER_PAGE } from "@/lib/searchParams";
import { cn } from "@/lib/utils";
import { Pathname } from "@/types/navigation";
import { useTranslations } from "next-intl";

export function RowsPerPage({
  pathname,
  persistedParams: { limit, query, filter },
}: {
  pathname: Pathname;
  persistedParams: PersistedParams;
}) {
  const t = useTranslations("Admin.Pagination");

  return (
    <div className="my-auto flex items-center gap-3">
      <p className="text-muted-foreground text-[13px]">{t("perPage")}</p>
      <div className="bg-secondary border-border flex flex-row gap-px rounded-sm border p-1">
        {ROWS_PER_PAGE.map((rows) => {
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
