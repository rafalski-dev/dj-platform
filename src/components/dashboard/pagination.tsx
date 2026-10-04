import { ChevronLeft, ChevronRight, EllipsisIcon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { cn, getPaginationItems } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  rowsLimit,
}: {
  page: number;
  totalPages: number;
  rowsLimit: number;
}) {
  return (
    <nav className="mx-auto flex flex-row items-center gap-x-1.5" aria-label="Pagination">
      <ArrowLeft isDisabled={page === 1} page={page} rowsLimit={rowsLimit} />
      {getPaginationItems(page, totalPages).map((item) =>
        typeof item === "number" ? (
          <Link
            key={item}
            href={{
              pathname: "/admin/clients",
              query: { page: item, limit: rowsLimit },
            }}
            className={cn(
              buttonVariants({ variant: item === page ? "default" : "outline", size: "sm" }),
              "size-8 px-0",
            )}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </Link>
        ) : (
          <span
            key={item}
            aria-hidden="true"
            className="text-muted-foreground flex size-6 items-center justify-center"
          >
            <EllipsisIcon className="size-4" />
          </span>
        ),
      )}
      <ArrowRight isDisabled={page === totalPages} page={page} rowsLimit={rowsLimit} />
    </nav>
  );
}

function ArrowLeft({
  isDisabled,
  page,
  rowsLimit,
}: {
  isDisabled: boolean;
  page: number;
  rowsLimit: number;
}) {
  if (isDisabled)
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-10 px-0"
        disabled
        aria-label="Previous page"
      >
        <ChevronLeft className="text-accent-foreground" />
      </Button>
    );

  return (
    <Link
      aria-label="Previous page"
      href={{ pathname: "/admin/clients", query: { page: page - 1, limit: rowsLimit } }}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 w-10 px-0")}
    >
      <ChevronLeft className="text-accent-foreground" />
    </Link>
  );
}

function ArrowRight({
  isDisabled,
  page,
  rowsLimit,
}: {
  isDisabled: boolean;
  page: number;
  rowsLimit: number;
}) {
  if (isDisabled)
    return (
      <Button variant="outline" size="sm" className="h-8 w-10 px-0" disabled aria-label="Next page">
        <ChevronRight className="text-accent-foreground" />
      </Button>
    );

  return (
    <Link
      aria-label="Next page"
      href={{ pathname: "/admin/clients", query: { page: page + 1, limit: rowsLimit } }}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 w-10 px-0")}
    >
      <ChevronRight className="text-accent-foreground" />
    </Link>
  );
}
