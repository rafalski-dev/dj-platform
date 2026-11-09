"use client";

import { useState } from "react";
import { Button } from "../ui/shadcn/button";
import { cn } from "@/lib/utils";

type TabsProps = {
  items: { label: string; value: string; icon?: React.ReactNode }[];
  onTabChange: (arg: string) => void;
};

export function Tabs({ items, onTabChange }: TabsProps) {
  const [isActive, setIsActive] = useState("link");

  return (
    <div>
      <div className="bg-background flex w-fit flex-row gap-2 rounded-md border px-1.5 py-1.5">
        {items.map((item) => {
          const activeOption = isActive === item.value;
          return (
            <Button
              key={item.value}
              variant={activeOption ? "default" : "ghost"}
              size="xs"
              className={cn(
                "text-foreground h-6.5 gap-2 rounded px-2",
                activeOption && "text-background",
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
