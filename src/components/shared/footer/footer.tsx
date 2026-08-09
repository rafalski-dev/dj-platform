import { clientItems, navItems } from "@/constants/navigations";
import { Logo } from "../logo";
import { Wrapper } from "../wrapper";
import { FooterSection } from "./footerSection";
import { socialMedia } from "@/constants/socialMedia";
import { getTranslations } from "next-intl/server";
import { FooterSocialSection } from "./footerSocialSection";

export async function Footer() {
  const t = await getTranslations("LandingPage.Footer");
  return (
    <footer className="border-border/20 border-t pt-15 pb-8">
      <Wrapper>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Logo size="text-[25px]" />
              <p className="text-popover-foreground max-w-75 text-[14.5px]">{t("description")}</p>
            </div>
            <div className="hidden md:block">
              <FooterSection title={t("navTitle")} linksList={navItems} />
            </div>
            <FooterSection title={t("clientTitle")} linksList={clientItems} />
            <FooterSocialSection title={t("socialTitle")} linksList={socialMedia} />
          </div>
          <div className="border-border/20 text-popover-foreground border-t pt-7">
            <p className="text-[13.5px]">
              {t("developerCredit")}
              <span className="text-accent-foreground text-[14px]"> Jakub Rafalski</span>
            </p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
