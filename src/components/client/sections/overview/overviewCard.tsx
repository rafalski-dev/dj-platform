import { Badge } from "@/components/ui/shadcn/badge";
import { Card } from "@/components/ui/shadcn/card";
import { DotIcon } from "lucide-react";
import type { ReactNode } from "react";

type OverviewCardProps = {
  // a status (e.g. awaiting confirmation) – not every state has one
  badge?: string;
  label?: string;
  title: string;
  children?: ReactNode;
  // right side – a tile (days left) or a button
  aside: ReactNode;
};

// One look for every state of the overview (no event, inquiry, event)
export function OverviewCard({ badge, label, title, children, aside }: OverviewCardProps) {
  return (
    <Card size="md" className="ring-border-strong md:[--card-spacing:--spacing(8)]">
      <div className="flex flex-col gap-6 px-(--card-spacing) sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col items-start gap-4">
          {badge && (
            <Badge
              variant="outline"
              className="text-accent-foreground border-accent-foreground/30 bg-accent-foreground/5 pr-3"
            >
              <DotIcon strokeWidth={8} />
              {badge}
            </Badge>
          )}
          <div className="flex min-w-0 flex-col gap-2">
            {label && (
              <p className="text-accent-foreground text-xs font-semibold tracking-widest uppercase">
                {label}
              </p>
            )}
            <p className="font-serif text-[32px]/none wrap-break-word lining-nums md:text-[40px]/none">
              {title}
            </p>
          </div>
          {children}
        </div>
        {aside}
      </div>
    </Card>
  );
}

// The right-side tile of a card that only shows information (e.g. days left)
export function OverviewCardTile({ children }: { children: ReactNode }) {
  return (
    <div className="border-border-strong bg-foreground/5 flex shrink-0 flex-col items-center justify-center gap-1 rounded-xl border px-8 py-5">
      {children}
    </div>
  );
}
