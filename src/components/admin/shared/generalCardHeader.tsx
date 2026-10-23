import { buttonVariants } from "@/components/ui/shadcn/button";
import { CardHeader } from "@/components/ui/shadcn/card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Pathname } from "@/types/navigation";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type GeneralCardHeaderProps = {
  title: string;
  count?: number;
  pathname?: Pathname;
};

export function GeneralCardHeader({ title, count, pathname }: GeneralCardHeaderProps) {
  const t = useTranslations("Admin.GeneralCardHeader");

  return (
    <CardHeader className="flex items-center justify-between">
      <div className="flex flex-row flex-wrap items-center gap-3">
        <h2 className="text-[24px]">{title}</h2>
        {typeof count === "number" && (
          <div className="bg-gold-dark/20 text-gold-light flex size-6 items-center justify-center rounded-full">
            {count}
          </div>
        )}
      </div>
      {pathname && (
        <Link
          href={pathname}
          className={cn(
            buttonVariants({ variant: "outline", size: "xs" }),
            "text-accent-foreground",
          )}
        >
          <PlusIcon />
          {t("add")}
        </Link>
      )}
    </CardHeader>
  );
}
