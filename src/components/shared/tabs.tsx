"use client";

import { useState } from "react";
import { Button } from "../ui/shadcn/button";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import { Pathname } from "@/types/navigation";

type TabsProps = {
  items: { label: string; value: string; icon?: React.ReactNode }[];
  defaultItem: string;
  onTabChange: (arg: string) => void;
};

export function Tabs({ items, defaultItem, onTabChange }: TabsProps) {
  const [isActive, setIsActive] = useState(defaultItem);

  return (
    <div>
      <div className="bg-background flex w-fit flex-row gap-2 rounded-md border px-1.5 py-1.5">
        {items.map((item) => {
          const activeOption = isActive === item.value;
          return (
            <Button
              key={item.value}
              variant="ghost"
              size="xs"
              className={cn(
                "text-muted-foreground hover:text-foreground h-6.5 gap-2 rounded px-2 hover:bg-transparent",
                activeOption && "bg-foreground/10 text-foreground hover:bg-foreground/10 shadow-xs",
              )}
              onClick={() => {
                setIsActive(item.value);
                onTabChange(item.value);
              }}
            >
              {item.icon}
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

type PageTabsProps = {
  items: { key: string; label: string; icon: React.ReactNode; pathname: Pathname }[];
};

export function PageTabs({ items }: PageTabsProps) {
  const pathname = usePathname();
  return (
    <div className="flex border-b">
      {items.map((el) => {
        const isActive = pathname === el.pathname;
        return (
          <Link
            key={el.key}
            href={el.pathname}
            className={cn(
              "text-popover-foreground -mb-px flex flex-row items-center gap-2 border-b-2 border-transparent px-4 py-3",
              isActive && "text-foreground border-accent-foreground border-b-2",
            )}
          >
            <span>{el.icon}</span>
            <span>{el.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
