import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Link } from "@/i18n/navigation";

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
    <nav className="mx-auto flex flex-row gap-x-1.5" aria-label="Pagination">
      <ArrowLeft isDisabled={page === 1} page={page} rowsLimit={rowsLimit} />
      {Array(totalPages)
        .fill(null)
        .map((_, index) => {
          return (
            <Link
              key={index + 1}
              href={{
                pathname: "/admin/clients",
                query: { page: index + 1, limit: rowsLimit },
              }}
              className={buttonVariants({
                variant: index + 1 === page ? "default" : "outline",
                size: "sm",
                className: "size-10",
              })}
              aria-current={index + 1 === page ? "page" : undefined}
            >
              {index + 1}
            </Link>
          );
        })}
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
      <Button variant="outline" size="sm" disabled aria-label="Previous page">
        <ChevronLeft className="text-accent-foreground" />
      </Button>
    );

  return (
    <Link
      aria-label="Previous page"
      href={{ pathname: "/admin/clients", query: { page: page - 1, limit: rowsLimit } }}
      className={buttonVariants({ variant: "outline", size: "sm" })}
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
      <Button variant="outline" size="sm" disabled aria-label="Next page">
        <ChevronRight className="text-accent-foreground" />
      </Button>
    );

  return (
    <Link
      aria-label="Next page"
      href={{ pathname: "/admin/clients", query: { page: page + 1, limit: rowsLimit } }}
      className={buttonVariants({ variant: "outline", size: "sm" })}
    >
      <ChevronRight className="text-accent-foreground" />
    </Link>
  );
}
