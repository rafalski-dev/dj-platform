import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getSession } from "@/lib/auth-helpers";
import { MenuIcon, XIcon } from "lucide-react";
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
import { AdminNavigation } from "../shared/header/adminNavigation";
import { LogoutButton } from "./logoutButton";

export async function SideNavMobile() {
  const t = await getTranslations("Admin.Header");

  const session = await getSession();
  const firstLetter = session?.user.name.split(" ")[0].charAt(0);
  const secondLetter = session?.user.name.split(" ")[1].charAt(0);

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="icon" size="icon" aria-label={t("openMenu")} />}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false}>
        <SheetHeader className="flex flex-row items-start justify-between border-b pb-6">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>{`${firstLetter}${secondLetter}`}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <div className="text-foreground">{session?.user.name}</div>
              <div className="text-xs font-light">{session?.user.email}</div>
            </div>
          </div>
          <SheetClose
            render={
              <Button variant="icon" size="icon-xs" className="ml-1" aria-label={t("closeMenu")} />
            }
          >
            <XIcon />
          </SheetClose>
        </SheetHeader>
        <AdminNavigation />
        <SheetFooter>
          <LogoutButton>{t("logoutBtn")}</LogoutButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
