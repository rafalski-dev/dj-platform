import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { Menu, XIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import { Link } from "@/i18n/navigation";
import { NavItem } from "@/types/navigation";
import { getTranslations } from "next-intl/server";
import { Logo } from "../../../shared/logo";
import { ThemeToggle } from "./themeToggle";
import { LanguageToggle } from "./languageToggle";

export async function NavMobile({ navItems }: { navItems: NavItem[] }) {
  const t = await getTranslations("LandingPage.Header");
  const nav = await getTranslations("LandingPage.Navigation");

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label={t("openMenu")}
            className="text-accent-foreground"
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="top" showCloseButton={false}>
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
                <Button
                  variant="outline"
                  size="icon"
                  className="text-accent-foreground ml-1"
                  aria-label={t("closeMenu")}
                />
              }
            >
              <XIcon />
            </SheetClose>
          </div>
        </SheetHeader>
        <nav className="my-7 flex flex-col items-start px-5 md:px-6">
          {navItems.map(({ navKey, path }) => (
            <SheetClose
              nativeButton={false}
              key={navKey}
              render={
                <Link
                  className="text-foreground/90 border-border w-full border-t py-3 text-start font-serif text-3xl md:text-4xl"
                  href={{ pathname: "/", hash: nav(`navPaths.${path}`) }}
                />
              }
            >
              {nav(`navItems.${navKey}`)}
            </SheetClose>
          ))}
        </nav>
        <SheetFooter>
          <SheetClose
            nativeButton={false}
            render={<Link href="/login" className={buttonVariants({ variant: "outline" })} />}
          >
            {t("secondaryCTA")}
          </SheetClose>
          <SheetClose
            nativeButton={false}
            render={
              <Link
                href={{ pathname: "/", hash: nav("navPaths.contact") }}
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
            <Link
              key={navKey}
              href={{ pathname: "/", hash: nav(`navPaths.${path}`) }}
              className={buttonVariants({ variant: "link", size: "sm" })}
            >
              {nav(`navItems.${navKey}`)}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/login" className={buttonVariants({ variant: "outline", size: "sm" })}>
          {t("secondaryCTA")}
        </Link>
        <Link
          href={{ pathname: "/", hash: nav("navPaths.contact") }}
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          {t("primaryCTA")}
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle ariaLabel={t("changeTheme")} />
          <LanguageToggle ariaLabel={t("changeLanguage")} />
        </div>
      </div>
    </div>
  );
}
