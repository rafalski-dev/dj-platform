import { getClientEventOptions, getOptionValue, getSelectedEventOption } from "@/data/dashboard";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { EventSelectorMenu } from "./eventSelectorMenu";

export async function EventSelector() {
  const [options, selected] = await Promise.all([
    getClientEventOptions(),
    getSelectedEventOption(),
  ]);

  if (!selected) return <NoEventsPlaceholder />;

  return (
    <EventSelectorMenu
      options={options.map((option) => ({ ...option, value: getOptionValue(option) }))}
      selectedValue={getOptionValue(selected)}
    />
  );
}

// Same place and size as the selector – the nav doesn't jump, and the dashed border says
// "something can be added here"
async function NoEventsPlaceholder() {
  const t = await getTranslations("Dashboard.EventSelector.empty");

  return (
    <Link
      // the overview opens the inquiry form while there are no events
      href="/dashboard"
      className="border-border-strong hover:bg-accent-foreground/5 group flex items-center gap-3 rounded-lg border border-dashed p-2.5 transition-colors duration-200 print:hidden"
    >
      <span className="border-border-strong bg-foreground/5 text-accent-foreground flex size-11 shrink-0 items-center justify-center rounded-md border">
        <PlusIcon size={18} strokeWidth={1.5} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-foreground text-sm">{t("title")}</span>
        <span className="text-accent-foreground flex items-center gap-1 text-xs">
          {t("action")}
          <ArrowRightIcon
            size={12}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </span>
    </Link>
  );
}
