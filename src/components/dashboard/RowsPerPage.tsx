import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const rowsPerPageData = ["8", "12", "16"] as const;

export type RowsPerPageType = (typeof rowsPerPageData)[number];

export function RowsPerPage({ rowsLimit }: { rowsLimit: RowsPerPageType }) {
  return (
    <div className="my-auto flex items-center gap-3">
      <p className="text-muted-foreground text-[13px]">Per page</p>
      <div className="bg-secondary border-border/15 flex flex-row gap-px rounded-sm border p-0.5">
        {rowsPerPageData.map((rows, index) => {
          return (
            <Link
              className={cn(
                "text-popover-foreground/80 hover:text-muted-foreground rounded-sm px-2 py-0.5 text-[13px] duration-200",
                rows === rowsLimit && "bg-accent-foreground/10 text-accent-foreground",
              )}
              key={index}
              href={{ pathname: "/admin/clients", query: { limit: rows } }}
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
