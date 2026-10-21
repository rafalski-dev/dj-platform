import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pathname } from "@/types/navigation";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  error?: {
    label: string;
    onClick: () => void;
  };
  action?: {
    label: string;
    href: Pathname;
    icon?: ReactNode;
  };
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  error,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={cn("gap-6 px-4 py-10 md:py-14", className)}>
      <EmptyHeader className="gap-3">
        {icon && (
          <EmptyMedia
            variant="icon"
            className="border-border bg-accent-foreground/10 text-accent-foreground mb-1 size-12 rounded-xl border [&_svg:not([class*='size-'])]:size-5"
          >
            {icon}
          </EmptyMedia>
        )}
        <EmptyTitle className="text-foreground font-serif text-2xl font-normal tracking-normal">
          {title}
        </EmptyTitle>
        <EmptyDescription className="text-muted-foreground max-w-xs text-sm font-light">
          {description}
        </EmptyDescription>
      </EmptyHeader>

      {action && (
        <EmptyContent>
          <Link href={action.href} className={cn(buttonVariants({ size: "sm" }), "gap-2")}>
            {action.icon}
            {action.label}
          </Link>
        </EmptyContent>
      )}
      {error && (
        <EmptyContent>
          <Button onClick={error.onClick}>{error.label}</Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
