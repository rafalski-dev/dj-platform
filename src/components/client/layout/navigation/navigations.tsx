"use client";

import { SheetClose } from "@/components/ui/shadcn/sheet";
import { dashboardItems } from "@/constants/navigations";
import { Link, usePathname } from "@/i18n/navigation";
import { cn, isNavItemActive } from "@/lib/utils";
import { DashboardItem } from "@/types/navigation";
import {
  CalendarDaysIcon,
  DotIcon,
  FilesIcon,
  HomeIcon,
  ListMusicIcon,
  SettingsIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const icons = {
  home: <HomeIcon size={19} strokeWidth={1.4} />,
  events: <CalendarDaysIcon size={19} strokeWidth={1.4} />,
  contracts: <FilesIcon size={19} strokeWidth={1.4} />,
  playlists: <ListMusicIcon size={19} strokeWidth={1.4} />,
  settings: <SettingsIcon size={19} strokeWidth={1.4} />,
};

export function NavigationClientContent() {
  const t = useTranslations("Dashboard.Header");
  const pathname = usePathname();

  return (
    <div className="print:hidden">
      <p className="text-popover-foreground/80 mt-6 font-sans text-xs tracking-[2px] uppercase">
        {t("nav.title")}
      </p>
      <nav className="flex flex-col gap-1.5 py-3">
        {dashboardItems.map((el: DashboardItem) => {
          const isActive = isNavItemActive(pathname, el.path);

          return (
            <SheetClose
              key={el.navKey}
              nativeButton={false}
              render={
                <Link
                  href={el.path}
                  className={cn(
                    "text-muted-foreground/80 relative flex items-center justify-start gap-3 rounded-sm px-4 py-2.5 text-[15px] font-light tracking-wide transition-colors duration-200",
                    isActive
                      ? "ring-border bg-accent-foreground/10 text-accent-foreground ring-1"
                      : "hover:bg-accent-foreground/5 hover:text-accent-foreground",
                  )}
                />
              }
            >
              {icons[el.navKey]}
              {t(`nav.navItems.${el.navKey}`)}
              {isActive && (
                <span className="absolute right-1">
                  <DotIcon size={26} />
                </span>
              )}
            </SheetClose>
          );
        })}
      </nav>
    </div>
  );
}

export function NavigationClientDesktop() {
  const t = useTranslations("Dashboard.Header");
  const pathname = usePathname();

  return (
    <div className="print:hidden">
      <p className="text-popover-foreground/80 font-sans text-xs tracking-[2px] uppercase">
        {t("nav.title")}
      </p>
      <nav className="flex flex-col gap-1.5 py-3">
        {dashboardItems.map((el: DashboardItem) => {
          const isActive = isNavItemActive(pathname, el.path);

          return (
            <Link
              key={el.navKey}
              href={el.path}
              className={cn(
                "text-muted-foreground/80 relative flex items-center justify-start gap-3 rounded-sm px-4 py-2.5 text-[15px] font-light tracking-wide transition-colors duration-200",
                isActive
                  ? "ring-border-strong bg-accent-foreground/10 text-accent-foreground ring-1"
                  : "hover:bg-accent-foreground/5 hover:text-accent-foreground",
              )}
            >
              {icons[el.navKey]}
              {t(`nav.navItems.${el.navKey}`)}
              {isActive && (
                <span className="absolute right-2">
                  <DotIcon size={26} />
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
