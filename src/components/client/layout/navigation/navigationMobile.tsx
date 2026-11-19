import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import { LogoutButton } from "@/components/admin/shared/logoutButton";
import { NavigationClientContent } from "@/components/client/layout/navigation/navigations";
import { EventSelector } from "@/components/client/layout/navigation/eventSelector";
import { getSelectedEventOption } from "@/data/dashboard";
import { getSession } from "@/lib/auth-helpers";
import { cn, createInitials } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function NavigationClientMobile({ display }: { display: string }) {
  const t = await getTranslations("Dashboard.Header");
  const [session, selected] = await Promise.all([getSession(), getSelectedEventOption()]);
  const clientName = session?.user.name ?? "";
  const clientEmail = session?.user.email ?? "";

  return (
    <Sheet>
      <SheetTrigger className={display} aria-label={t("openMenu")}>
        <Avatar size="lg">
          <AvatarFallback>{createInitials(clientName)}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className={cn("", display)}>
        <SheetHeader className="flex flex-row items-start justify-between border-b pb-6">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>{createInitials(clientName)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <div className="text-foreground">{clientName}</div>
              <div className="text-xs">{clientEmail}</div>
            </div>
          </div>
          <SheetClose
            render={
              <Button
                variant="outline"
                size="icon-xs"
                className="text-accent-foreground ml-1"
                aria-label={t("closeMenu")}
              />
            }
          >
            <XIcon />
          </SheetClose>
        </SheetHeader>
        <NavigationClientContent
          eventSelector={<EventSelector />}
          hasEvent={selected?.kind === "event"}
        />
        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
