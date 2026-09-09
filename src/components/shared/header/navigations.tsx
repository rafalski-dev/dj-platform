import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, XIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { NavItem } from "@/types/navigation";
import { getTranslations } from "next-intl/server";
import { Logo } from "../logo";
import { ThemeToggle } from "./themeToggle";
import { LanguageToggle } from "./languageToggle";

export async function NavMobile({ navItems }: { navItems: NavItem[] }) {
  const t = await getTranslations("LandingPage.Header");
  const nav = await getTranslations("LandingPage.Navigation");

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="icon" size="icon" aria-label={t("openMenu")} />}>
        <Menu />
      </SheetTrigger>
      <SheetContent side="top" className="gap-5" showCloseButton={false}>
        <div>
          <SheetHeader className="flex-row justify-between">
            <SheetTitle className="sr-only">{t("menuLabel")}</SheetTitle>
            <SheetClose
              nativeButton={false}
              render={
                <Logo
                  href="/"
                  iconSize={22}
                  className="text-foreground mb-0.75 w-30 text-[24px] lg:text-[20px]"
                />
              }
            ></SheetClose>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3">
                <ThemeToggle ariaLabel={t("changeTheme")} />
                <LanguageToggle ariaLabel={t("changeLanguage")} />
              </div>
              <SheetClose
                render={
                  <Button variant="icon" size="icon" className="ml-1" aria-label={t("closeMenu")} />
                }
              >
                <XIcon />
              </SheetClose>
            </div>
          </SheetHeader>
          <nav className="flex flex-col items-start px-5 md:px-6">
            {navItems.map(({ navKey, path }) => (
              <SheetClose
                nativeButton={false}
                key={navKey}
                render={
                  <a
                    className="text-foreground/90 border-border/12 w-full border-b py-3 text-start font-serif text-3xl md:text-4xl"
                    href={nav(`navPaths.${path}`)}
                  />
                }
              >
                {nav(`navItems.${navKey}`)}
              </SheetClose>
            ))}
          </nav>
        </div>
        <SheetFooter>
          <SheetClose
            nativeButton={false}
            render={<Link href="/signIn" className={buttonVariants({ variant: "outline" })} />}
          >
            {t("secondaryCTA")}
          </SheetClose>
          <SheetClose
            nativeButton={false}
            render={
              <a
                href={nav("navPaths.contact")}
                className={buttonVariants({ variant: "default" })}
              />
            }
          >
            {t("primaryCTA")}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export async function NavDesktop({ navItems }: { navItems: NavItem[] }) {
  const t = await getTranslations("LandingPage.Header");
  const nav = await getTranslations("LandingPage.Navigation");
  return (
    <div className="flex w-full items-center justify-between gap-5">
      <nav className="flex flex-row items-center gap-3">
        {navItems.map(({ navKey, path }) => {
          return (
            <a
              key={navKey}
              href={nav(`navPaths.${path}`)}
              className="text-muted-foreground hover:text-accent-foreground/90 p-2 text-[15px] transition-colors"
            >
              {nav(`navItems.${navKey}`)}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/signIn" className={buttonVariants({ variant: "outline", size: "sm" })}>
          {t("secondaryCTA")}
        </Link>
        <a
          href={nav("navPaths.contact")}
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          {t("primaryCTA")}
        </a>
        <div className="flex items-center gap-3">
          <ThemeToggle ariaLabel={t("changeTheme")} />
          <LanguageToggle ariaLabel={t("changeLanguage")} />
        </div>
      </div>
    </div>
  );
}
