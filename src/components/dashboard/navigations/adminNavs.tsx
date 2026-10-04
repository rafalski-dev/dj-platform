"use client";

import { SheetClose } from "@/components/ui/sheet";
import { adminItems } from "@/constants/navigations";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { AdminItem } from "@/types/navigation";
import {
  CalendarDaysIcon,
  DotIcon,
  FilesIcon,
  HomeIcon,
  ListMusicIcon,
  UserPenIcon,
  UsersIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const icons = {
  home: <HomeIcon size={19} strokeWidth={1.4} />,
  clients: <UsersIcon size={19} strokeWidth={1.4} />,
  events: <CalendarDaysIcon size={19} strokeWidth={1.4} />,
  contracts: <FilesIcon size={19} strokeWidth={1.4} />,
  playlist: <ListMusicIcon size={19} strokeWidth={1.4} />,
  details: <UserPenIcon size={19} strokeWidth={1.4} />,
};

export function AdminMobileNav() {
  const t = useTranslations("Admin.Header");
  const pathname = usePathname();

  return (
    <div>
      <p className="text-popover-foreground/80 mt-6 font-sans text-xs tracking-[2px] uppercase">
        Admin panel
      </p>
      <nav className="flex flex-col gap-1.5 py-3">
        {adminItems.map((el: AdminItem) => {
          const isActive = el.path === pathname;

          return (
            <SheetClose
              key={el.navKey}
              nativeButton={false}
              render={
                <Link
                  href={el.path}
                  className={cn(
                    "text-muted-foreground/80 relative flex items-center justify-start gap-3 px-4 py-2.5 text-[15px] font-light tracking-wide",
                    isActive &&
                      "ring-border bg-accent-foreground/10 text-accent-foreground rounded-sm ring-1 duration-200",
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

export function AdminDesktopNavigation() {
  const t = useTranslations("Admin.Header");
  const pathname = usePathname();

  return (
    <div>
      <p className="text-popover-foreground/80 font-sans text-xs tracking-[2px] uppercase">
        Admin panel
      </p>
      <nav className="flex flex-col gap-1.5 py-3">
        {adminItems.map((el: AdminItem) => {
          const isActive = el.path === pathname;

          return (
            <Link
              key={el.navKey}
              href={el.path}
              className={cn(
                "text-muted-foreground/80 relative flex items-center justify-start gap-3 px-4 py-2.5 text-[15px] font-light tracking-wide",
                isActive &&
                  "ring-border-strong bg-accent-foreground/10 text-accent-foreground rounded-sm ring-1 duration-200",
              )}
            >
              {" "}
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
