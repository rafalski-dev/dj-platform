import { navItems } from "@/constants/navigations";
import { Wrapper } from "../wrapper";
import { NavDesktop, NavMobile } from "./navigations";
import { Logo } from "../logo";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./themeToggle";
import { LanguageToggle } from "./languageToggle";
import { MoveLeftIcon } from "lucide-react";

export function Header() {
  return (
    <header
      className={
        "bg-background/70 border-border/10 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md"
      }
    >
      <Wrapper>
        <div className={"flex items-center justify-between py-4"}>
          <div className="flex w-full items-center">
            <Logo href="/" iconSize={22} className="mb-0.75 w-30 text-[24px] lg:text-[20px]" />
            <div className="hidden w-full lg:block">
              <NavDesktop navItems={navItems} />
            </div>
          </div>
          <div className="lg:hidden">
            <NavMobile navItems={navItems} />
          </div>
        </div>
      </Wrapper>
    </header>
  );
}

export async function PrivacyHeader() {
  const t = await getTranslations("LandingPage.Header");
  return (
    <header
      className={
        "bg-background/70 border-border/10 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md"
      }
    >
      <Wrapper>
        <div className={"flex items-center justify-between py-4"}>
          <Logo href="/" iconSize={22} className="mb-0.75 w-30 text-[24px] lg:text-[20px]" />
          <div className="flex items-center gap-3">
            <Link href="/" className={buttonVariants({ variant: "default", size: "sm" })}>
              {t("mainPageBtn")}
            </Link>
            <ThemeToggle ariaLabel={t("changeTheme")} />
            <LanguageToggle ariaLabel={t("changeLanguage")} />
          </div>
        </div>
      </Wrapper>
    </header>
  );
}

export async function HeaderAuth() {
  const t = await getTranslations("LandingPage.Header");
  return (
    <header className={"absolute top-0 left-0 z-50 w-full bg-transparent"}>
      <Wrapper>
        <div className={"flex items-center justify-between py-4"}>
          <Logo href="/" iconSize={22} className="mb-0.75 w-30 text-[24px]" />
          <div className="flex items-center gap-3">
            <Link href="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Home
            </Link>
            <ThemeToggle ariaLabel={t("changeTheme")} />
            <LanguageToggle ariaLabel={t("changeLanguage")} />
          </div>
        </div>
      </Wrapper>
    </header>
  );
}
