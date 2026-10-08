import { ChevronLeft, ChevronRight, EllipsisIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn, getPaginationItems } from "@/lib/utils";
import { PersistedParams } from "@/lib/searchParams";
import { Pathname } from "@/types/navigation";
import { useTranslations } from "next-intl";

export function Pagination({
  totalPages,
  pathname,
  persistedParams: { page, limit, query, filter },
}: {
  totalPages: number;
  persistedParams: PersistedParams;
  pathname: Pathname;
}) {
  const t = useTranslations("Admin.Pagination");
  const paginationOption = getPaginationItems(page, totalPages);

  return (
    <nav className="mx-auto flex flex-row items-center gap-x-1.5" aria-label={t("label")}>
      <ArrowLeft
        isDisabled={page === 1}
        pathname={pathname}
        page={page}
        limit={limit}
        query={query}
        filter={filter}
      />
      {paginationOption.map((item) =>
        typeof item === "number" ? (
          <Link
            key={item}
            href={{
              pathname: pathname,
              query: { page: item, limit: limit, query: query, filter: filter },
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
      <ArrowRight
        isDisabled={page === totalPages}
        pathname={pathname}
        page={page}
        limit={limit}
        query={query}
        filter={filter}
      />
    </nav>
  );
}

function ArrowLeft({
  isDisabled,
  page,
  limit,
  query,
  filter,
  pathname,
}: { isDisabled: boolean; pathname: Pathname } & PersistedParams) {
  const t = useTranslations("Admin.Pagination");

  if (isDisabled)
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-10 px-0"
        disabled
        aria-label={t("previous")}
      >
        <ChevronLeft className="text-accent-foreground" />
      </Button>
    );

  return (
    <Link
      aria-label={t("previous")}
      href={{
        pathname: pathname,
        query: { page: page - 1, limit: limit, query: query, filter: filter },
      }}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 w-10 px-0")}
    >
      <ChevronLeft className="text-accent-foreground" />
    </Link>
  );
}

function ArrowRight({
  isDisabled,
  page,
  limit,
  query,
  filter,
  pathname,
}: { isDisabled: boolean; pathname: Pathname } & PersistedParams) {
  const t = useTranslations("Admin.Pagination");

  if (isDisabled)
    return (
      <Button variant="outline" size="sm" className="h-8 w-10 px-0" disabled aria-label={t("next")}>
        <ChevronRight className="text-accent-foreground" />
      </Button>
    );

  return (
    <Link
      aria-label={t("next")}
      href={{
        pathname: pathname,
        query: { page: page + 1, limit: limit, query: query, filter: filter },
      }}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 w-10 px-0")}
    >
      <ChevronRight className="text-accent-foreground" />
    </Link>
  );
}
