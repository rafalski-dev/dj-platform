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
  home: <HomeIcon size={20} strokeWidth={1.5} />,
  clients: <UsersIcon size={20} strokeWidth={1.5} />,
  events: <CalendarDaysIcon size={20} strokeWidth={1.5} />,
  contracts: <FilesIcon size={20} strokeWidth={1.5} />,
  playlist: <ListMusicIcon size={20} strokeWidth={1.5} />,
  details: <UserPenIcon size={20} strokeWidth={1.5} />,
};

export function AdminNavigation() {
  const t = useTranslations("Admin.Header");
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1.5 py-4">
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
                  "relative flex items-center justify-start gap-3 py-3 pr-4 pl-3 text-base",
                  isActive && "bg-accent-foreground/10 text-accent-foreground rounded-sm",
                )}
              />
            }
          >
            {icons[el.navKey]}
            {t(`nav.${el.navKey}`)}
            {isActive && (
              <span className="absolute right-1">
                <DotIcon size={26} />
              </span>
            )}
          </SheetClose>
        );
      })}
    </nav>
  );
}
