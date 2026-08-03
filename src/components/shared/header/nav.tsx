import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { NavItem } from "@/types/navigation";

export function NavMobile({ navItems }: { navItems: NavItem[] }) {
  const t = useTranslations("LandingPage.Header");

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="icon" size="icon" />}>
        <Menu />
      </SheetTrigger>
      <SheetContent side="top" className="flex" showCloseButton={false}>
        <SheetHeader className="flex gap-5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-secondary-foreground bg-background font-serif text-[25px]"
            >
              Logo
            </Link>
            <SheetClose render={<Button variant="icon" size="icon" />}>
              <XIcon />
            </SheetClose>
          </div>
          <nav className="flex flex-col">
            {navItems.map(({ label, path }, index) => (
              <a
                key={index}
                href={path}
                className="border-border/10 hover:border-border/20 group border-b py-3 font-serif transition-all"
              >
                <span className="group-hover:text-primary inline-block text-3xl transition-all duration-300 group-hover:translate-x-2 md:text-4xl">
                  {label}
                </span>
              </a>
            ))}
          </nav>
        </SheetHeader>
        <SheetFooter>
          <Button variant="outline">{t("signIn")}</Button>
          <Button>{t("availability")}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function NavDesktop() {
  return;
}
