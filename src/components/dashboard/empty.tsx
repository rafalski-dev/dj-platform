import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

type ShowEmptyProps = {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: ComponentProps<typeof Link>["href"];
    icon?: ReactNode;
  };
};

export function ShowEmpty({ icon, title, description, action }: ShowEmptyProps) {
  return (
    <Empty className="gap-6 px-4 py-10 md:py-14">
      <EmptyHeader className="gap-3">
        <EmptyMedia
          variant="icon"
          className="border-border bg-accent-foreground/10 text-accent-foreground mb-1 size-12 rounded-xl border [&_svg:not([class*='size-'])]:size-5"
        >
          {icon}
        </EmptyMedia>
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
    </Empty>
  );
}
