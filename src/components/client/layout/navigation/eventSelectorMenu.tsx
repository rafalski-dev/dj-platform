"use client";

import { selectEventAction } from "@/actions/dashboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import type { ClientEventOption } from "@/data/dashboard";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useTransition } from "react";

type EventSelectorMenuProps = {
  options: (ClientEventOption & { value: string })[];
  selectedValue: string;
};

// An inquiry waits for the DJ; Pending = date confirmed, contract not signed yet
const dotStyles = {
  inquiry: "bg-warning",
  Pending: "bg-success",
  Active: "bg-success",
  Completed: "bg-muted-foreground",
  Cancelled: "bg-destructive",
  Archived: "bg-muted-foreground",
};

export function EventSelectorMenu({ options, selectedValue }: EventSelectorMenuProps) {
  const t = useTranslations("Dashboard.EventSelector");
  const [isPending, startTransition] = useTransition();

  const selected = options.find(({ value }) => value === selectedValue) ?? options[0];

  function onValueChange(value: string) {
    if (value === selectedValue) return;
    startTransition(async () => {
      await selectEventAction(value);
    });
  }

  return (
    <div className="print:hidden">
      {/* one event – nothing to choose, just the label */}
      {options.length === 1 ? (
        <div className="border-border rounded-lg border p-2.5">
          <EventOption option={selected} />
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={t("change")}
            className={cn(
              "border-border hover:bg-accent-foreground/5 data-popup-open:bg-accent-foreground/5 flex w-full items-center gap-2 rounded-lg border p-2.5 text-left transition-colors duration-200",
              isPending && "opacity-60",
            )}
          >
            <EventOption option={selected} />
            <ChevronsUpDownIcon size={16} className="text-muted-foreground ml-auto shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-1.5">
            <DropdownMenuRadioGroup value={selectedValue} onValueChange={onValueChange}>
              {options.map((option) => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className="group/option p-2 pr-8"
                >
                  <EventOption option={option} />
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

function EventOption({ option }: { option: ClientEventOption }) {
  const t = useTranslations("Dashboard.EventSelector");
  const tTypes = useTranslations("Admin.Clients.list.eventTypes");
  const format = useFormatter();

  const isInquiry = option.kind === "inquiry";
  const name = isInquiry ? `${tTypes(option.type)} · ${option.place}` : option.name;
  const statusKey = isInquiry ? "inquiry" : option.status;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <time
        dateTime={option.date.toISOString().slice(0, 10)}
        // on the gold highlighted item the light tile would vanish – darker border and fill there
        className="border-border-strong bg-foreground/5 group-focus/option:border-background/40 group-focus/option:bg-background/15 flex size-11 shrink-0 flex-col items-center justify-center rounded-md border"
      >
        <span className="text-accent-foreground font-serif text-base/none lining-nums">
          {format.dateTime(option.date, { day: "2-digit" })}
        </span>
        <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
          {format.dateTime(option.date, { month: "short" })}
        </span>
      </time>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-foreground truncate text-sm">{name}</span>
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <span className={cn("size-1.5 shrink-0 rounded-full", dotStyles[statusKey])} />
          <span className="truncate">
            {t(`status.${statusKey}`)} · {format.dateTime(option.date, { year: "numeric" })}
          </span>
        </span>
      </div>
    </div>
  );
}
