import { navItems } from "@/constants/navigations";
import { Wrapper } from "../../../shared/wrapper";
import { NavDesktop, NavMobile } from "./navigations";
import { Logo } from "../../../shared/logo";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { ThemeToggle } from "./themeToggle";
import { LanguageToggle } from "./languageToggle";

export function HeaderLandingpage() {
  return (
    <header
      className={
        "bg-background/70 border-border fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md"
      }
    >
      <Wrapper>
        <div className={"flex items-center justify-between py-4"}>
          <div className="flex w-full items-center justify-between">
            <Logo href="/" iconSize={22} className="mb-0.75 w-30 text-[24px] lg:text-[20px]" />
            <div className="hidden w-full lg:block">
              <NavDesktop navItems={navItems} />
            </div>
            <div className="lg:hidden">
              <NavMobile navItems={navItems} />
            </div>
          </div>
        </div>
      </Wrapper>
    </header>
  );
}

export async function HeaderPrivacy() {
  const t = await getTranslations("LandingPage.Header");
  return (
    <header
      className={
        "bg-background/70 border-border fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md"
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
