"use client";

import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { Link } from "@/i18n/navigation";
import { CalendarIcon, PencilIcon, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type EditPopoverProps = { clientId: string; eventId: string };

export function EditPopover({ clientId, eventId }: EditPopoverProps) {
  const t = useTranslations("Admin.Contracts.Details.header");

  return (
    <Popover>
      <PopoverTrigger render={<Button size="sm" variant="outline" />}>
        <PencilIcon />
        {t("edit")}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto min-w-48 gap-1 p-1.5">
        <Link
          href={{ pathname: "/admin/clients/[clientId]/edit", params: { clientId } }}
          className={buttonVariants({ variant: "ghost", size: "sm", className: "justify-start" })}
        >
          <UserIcon />
          {t("editClient")}
        </Link>
        <Link
          href={{ pathname: "/admin/events/[eventId]/edit", params: { eventId } }}
          className={buttonVariants({ variant: "ghost", size: "sm", className: "justify-start" })}
        >
          <CalendarIcon />
          {t("editEvent")}
        </Link>
      </PopoverContent>
    </Popover>
  );
}
