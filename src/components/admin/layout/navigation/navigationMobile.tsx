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
import { NavigationContent } from "@/components/admin/layout/navigation/navigations";
import { getSession } from "@/lib/auth-helpers";
import { cn, createInitials } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function NavigationAdminMobile({ display }: { display: string }) {
  const t = await getTranslations("Admin.Header");
  const session = await getSession();
  const adminName = session?.user.name ?? "";
  const adminEmail = session?.user.email ?? "";

  return (
    <Sheet>
      <SheetTrigger className={display} aria-label={t("openMenu")}>
        <Avatar size="lg">
          <AvatarFallback>{createInitials(adminName)}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className={cn("", display)}>
        <SheetHeader className="flex flex-row items-start justify-between border-b pb-6">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>{createInitials(adminName)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <div className="text-foreground">{adminName}</div>
              <div className="text-xs">{adminEmail}</div>
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
        <NavigationContent />
        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
