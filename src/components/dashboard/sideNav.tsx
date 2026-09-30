import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getSession } from "@/lib/auth-helpers";
import { XIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";
import { LogoutButton } from "./logoutButton";
import { AdminMobileNav } from "./navigations/adminNavs";
import { cn } from "@/lib/utils";

export async function SideNavMobile({ display }: { display: string }) {
  const t = await getTranslations("Admin.Header");
  const session = await getSession();
  const firstChar = session?.user.name.split(" ")[0].charAt(0);
  const lastChar = session?.user.name.split(" ")[1].charAt(0);
  const adminName = session?.user.name;
  const adminEmail = session?.user.email;

  return (
    <Sheet>
      <SheetTrigger className={display}>
        <Avatar size="lg">
          <AvatarFallback>{`${firstChar}${lastChar}`}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className={cn("", display)}>
        <SheetHeader className="flex flex-row items-start justify-between border-b pb-6">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>{`${firstChar}${lastChar}`}</AvatarFallback>
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
        <AdminMobileNav />
        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
