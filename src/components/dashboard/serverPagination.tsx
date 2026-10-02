import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

export async function ServerPagination({ page }: { page: string | string[] | undefined }) {
  return (
    <div className="mx-auto flex flex-row gap-x-1.5">
      <ArrowLeft isDisabled={!page || page === "1"} />
      <Link
        href={"/admin/clients?page=1"}
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className: "size-10",
        })}
      >
        1
      </Link>
      <Link
        href={"/admin/clients?page=2"}
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className: "text-accent-foreground size-10",
        })}
      >
        2
      </Link>
      <Link
        href={"/admin/clients?page=3"}
        className={buttonVariants({ variant: "outline", size: "sm", className: "size-10" })}
      >
        3
      </Link>
      <ArrowRight isDisabled={false} />
    </div>
  );
}

function ArrowLeft({ isDisabled }: { isDisabled: boolean }) {
  if (isDisabled)
    return (
      <Button variant="outline" size="sm" disabled>
        <ChevronLeft className="text-accent-foreground" />
      </Button>
    );

  return (
    <Link href="" className={buttonVariants({ variant: "outline", size: "sm" })}>
      <ChevronLeft className="text-accent-foreground" />
    </Link>
  );
}

function ArrowRight({ isDisabled }: { isDisabled: boolean }) {
  if (isDisabled)
    return (
      <Button variant="outline" size="sm" disabled>
        <ChevronLeft className="text-accent-foreground" />
      </Button>
    );

  return (
    <Link href="" className={buttonVariants({ variant: "outline", size: "sm" })}>
      <ChevronRight className="text-accent-foreground" />
    </Link>
  );
}
