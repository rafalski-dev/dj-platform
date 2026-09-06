import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Moon, XIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { NavItem } from "@/types/navigation";
import { getTranslations } from "next-intl/server";

export async function NavMobile({ navItems }: { navItems: NavItem[] }) {
  const th = await getTranslations("LandingPage.Header");
  const tn = await getTranslations("LandingPage.Navigation");

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
            {navItems.map(({ navKey, path }) => (
              <a
                key={navKey}
                href={path}
                className="border-border/10 hover:border-border/20 group border-b py-3 font-serif transition-all"
              >
                <span className="group-hover:text-primary inline-block text-3xl transition-all duration-300 group-hover:translate-x-2 md:text-4xl">
                  {tn(navKey)}
                </span>
              </a>
            ))}
          </nav>
        </SheetHeader>
        <SheetFooter>
          <Button variant="outline">{th("PrimaryCTA")}</Button>
          <Button>{th("SecondaryCTA")}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export async function NavDesktop({ navItems }: { navItems: NavItem[] }) {
  const th = await getTranslations("LandingPage.Header");
  const tn = await getTranslations("LandingPage.Navigation");
  return (
    <div className="items-cetner flex w-full justify-between gap-5">
      <nav className="flex flex-row items-center gap-1">
        {navItems.map(({ navKey, path }) => {
          return (
            <a
              key={navKey}
              href={path}
              className="text-muted-foreground hover:text-accent-foreground/90 p-2 text-[15px] transition-colors"
            >
              {tn(navKey)}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="icon-sm" className="text-foreground">
            <Moon />
          </Button>
          <Button variant="secondary" size="icon-sm" className="text-foreground">
            EN
          </Button>
        </div>
        <Link href="/signIn" className={buttonVariants({ variant: "outline", size: "sm" })}>
          {th("SecondaryCTA")}
        </Link>
        <a href="#contact" className={buttonVariants({ variant: "default", size: "sm" })}>
          {th("PrimaryCTA")}
        </a>
      </div>
    </div>
  );
}
