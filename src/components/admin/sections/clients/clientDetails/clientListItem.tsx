import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import type { ComponentProps } from "react";

type ClientListItemProps = {
  pathname: ComponentProps<typeof Link>["href"];
  header: React.ReactNode;
  footer: React.ReactNode;
};

export function ClientListItem({ pathname, header, footer }: ClientListItemProps) {
  return (
    <li className="bg-background hover:border-border-strong rounded-lg border px-4 py-3 transition-colors duration-200">
      <Link href={pathname} className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex font-semibold">{header}</div>
          <div className="text-popover-foreground flex flex-row items-center gap-1.5 text-xs">
            {footer}
          </div>
        </div>
        <ChevronRight className="text-accent-foreground size-5" />
      </Link>
    </li>
  );
}
