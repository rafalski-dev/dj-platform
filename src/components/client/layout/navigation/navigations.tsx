"use client";

import { SheetClose } from "@/components/ui/shadcn/sheet";
import { dashboardAccountItems, dashboardEventItems } from "@/constants/navigations";
import { Link, usePathname } from "@/i18n/navigation";
import { cn, isNavItemActive } from "@/lib/utils";
import { DashboardItem } from "@/types/navigation";
import {
  CircleUserIcon,
  DotIcon,
  FilesIcon,
  HomeIcon,
  ListMusicIcon,
  MapPinIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

const icons = {
  home: <HomeIcon size={19} strokeWidth={1.4} />,
  event: <MapPinIcon size={19} strokeWidth={1.4} />,
  contracts: <FilesIcon size={19} strokeWidth={1.4} />,
  playlists: <ListMusicIcon size={19} strokeWidth={1.4} />,
  account: <CircleUserIcon size={19} strokeWidth={1.4} />,
};

type NavigationClientProps = {
  // server component – it comes in as a prop
  eventSelector?: ReactNode;
  // false while only an inquiry (or nothing) is selected
  hasEvent: boolean;
};

export function NavigationClientContent({ eventSelector, hasEvent }: NavigationClientProps) {
  return (
    <div className="mt-6 print:hidden">
      <NavigationGroups eventSelector={eventSelector} hasEvent={hasEvent} isSheet />
    </div>
  );
}

export function NavigationClientDesktop({ eventSelector, hasEvent }: NavigationClientProps) {
  return (
    <div className="print:hidden">
      <NavigationGroups eventSelector={eventSelector} hasEvent={hasEvent} />
    </div>
  );
}

function NavigationGroups({
  eventSelector,
  hasEvent,
  isSheet = false,
}: NavigationClientProps & { isSheet?: boolean }) {
  const t = useTranslations("Dashboard.Header");

  return (
    <div className="flex flex-col gap-5">
      <div>
        <GroupTitle>{t("nav.eventTitle")}</GroupTitle>
        {eventSelector && <div className="mt-3">{eventSelector}</div>}
        <NavigationList items={dashboardEventItems} hasEvent={hasEvent} isSheet={isSheet} />
      </div>
      <div>
        <GroupTitle>{t("nav.accountTitle")}</GroupTitle>
        <NavigationList items={dashboardAccountItems} hasEvent={hasEvent} isSheet={isSheet} />
      </div>
    </div>
  );
}

function GroupTitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-popover-foreground/80 font-sans text-xs tracking-[2px] uppercase">
      {children}
    </p>
  );
}

function NavigationList({
  items,
  hasEvent,
  isSheet,
}: {
  items: DashboardItem[];
  hasEvent: boolean;
  isSheet: boolean;
}) {
  const t = useTranslations("Dashboard.Header");
  const pathname = usePathname();

  const itemStyles =
    "text-muted-foreground/80 relative flex items-center justify-start gap-3 rounded-sm px-4 py-2.5 text-[15px] font-light tracking-wide transition-colors duration-200";

  return (
    <nav className="flex flex-col gap-1.5 py-3">
      {items.map((el) => {
        const isActive = isNavItemActive(pathname, el.path);
        const content = (
          <>
            {icons[el.navKey]}
            {t(`nav.navItems.${el.navKey}`)}
          </>
        );

        // Greyed out, not hidden – the client sees what comes after the DJ confirms
        if (el.requiresEvent && !hasEvent)
          return (
            <span
              key={el.navKey}
              aria-disabled="true"
              title={t("nav.afterConfirmation")}
              className={cn(itemStyles, "cursor-not-allowed opacity-40")}
            >
              {content}
            </span>
          );

        const linkProps = {
          href: el.path,
          className: cn(
            itemStyles,
            isActive
              ? "ring-border-strong bg-accent-foreground/10 text-accent-foreground ring-1"
              : "hover:bg-accent-foreground/5 hover:text-accent-foreground",
          ),
        };
        const activeDot = isActive && (
          <span className="absolute right-2">
            <DotIcon size={26} />
          </span>
        );

        // in the mobile sheet a click also closes it
        return isSheet ? (
          <SheetClose key={el.navKey} nativeButton={false} render={<Link {...linkProps} />}>
            {content}
            {activeDot}
          </SheetClose>
        ) : (
          <Link key={el.navKey} {...linkProps}>
            {content}
            {activeDot}
          </Link>
        );
      })}
    </nav>
  );
}
