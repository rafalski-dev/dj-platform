import { buttonVariants } from "@/components/ui/shadcn/button";
import { Link } from "@/i18n/navigation";
import { Pathname } from "@/types/navigation";
import { PlusIcon } from "lucide-react";

export type PageHeaderActionProps = { btnLabel: string; pathname: Pathname };

type PageHeaderProps = {
  title: string;
  label?: string;
  description?: string;
  action?: PageHeaderActionProps;
};

export function PageHeader({ label, title, description, action }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      {label && <p className="text-muted-foreground/90 mb-2 text-sm font-light">{label}</p>}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[32px] leading-none md:text-[36px] lg:text-[40px]">{title}</h1>
        {action && <PageHeaderAction {...action} />}
      </div>
      {description && <p className="text-muted-foreground text-sm">{description}</p>}
    </header>
  );
}

export function PageHeaderAction({ btnLabel, pathname }: PageHeaderActionProps) {
  return (
    <Link
      href={pathname}
      className={buttonVariants({
        size: "icon",
        className: "lg:w-auto lg:gap-1.5 lg:px-4 lg:text-sm lg:font-semibold",
      })}
    >
      <PlusIcon className="size-5 lg:size-3.5" strokeWidth={2.5} />
      <span className="sr-only lg:not-sr-only">{btnLabel}</span>
    </Link>
  );
}
