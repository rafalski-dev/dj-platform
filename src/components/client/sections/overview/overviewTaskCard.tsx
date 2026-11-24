import { buttonVariants } from "@/components/ui/shadcn/button";
import { Card } from "@/components/ui/shadcn/card";
import { Link } from "@/i18n/navigation";
import { Pathname } from "@/types/navigation";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

type OverviewTaskCardProps = {
  label: string;
  title: string;
  description: string;
  action: { label: string; pathname: Pathname };
  done?: boolean;
};

// One step for the client – a short summary and a link to the page where it's done.
// A done step stays on the page (the client sees what's finished) with a quieter edit link.
export function OverviewTaskCard({
  label,
  title,
  description,
  action,
  done,
}: OverviewTaskCardProps) {
  return (
    <Card size="md" className="ring-border-strong">
      {/* mobile: button under the text; from sm: text left, button right */}
      <div className="flex h-full flex-col items-start gap-4 px-(--card-spacing) sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground flex items-center gap-1.5 text-xs tracking-widest uppercase">
            {done && <CheckIcon className="text-accent size-3.5" />}
            {label}
          </p>
          <p className="font-serif text-[26px]/none">{title}</p>
          <p className="text-muted-foreground text-[15px] font-light">{description}</p>
        </div>
        {/* a real button look – it's clear the card takes you to another page */}
        <Link
          href={action.pathname}
          className={buttonVariants({
            variant: done ? "outline" : "default",
            className: "shrink-0",
          })}
        >
          {action.label}
          {!done && <ArrowRightIcon />}
        </Link>
      </div>
    </Card>
  );
}
