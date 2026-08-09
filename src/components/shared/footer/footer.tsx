import { clientItems, navItems } from "@/constants/navigations";
import { Logo } from "../logo";
import { Wrapper } from "../wrapper";
import { FooterSection } from "./footerSection";
import { socialMedia } from "@/constants/socialMedia";
import { getTranslations } from "next-intl/server";
import { FooterSocialSection } from "./footerSocialSection";
import { siteConfig } from "@/config/site";
import { getCurrentYear } from "@/lib/utils";

export async function Footer() {
  const t = await getTranslations("LandingPage.Footer");

  return (
    <footer className="border-border/20 border-t pt-15 pb-8">
      <Wrapper>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[40%_1fr_1fr_1fr]">
            <div className="flex flex-col gap-4">
              <Logo size="text-[25px] lg:text-[30px]" />
              <p className="text-popover-foreground max-w-75 text-[14.5px] lg:text-base">
                {t("description")}
              </p>
            </div>
            <FooterSection title={t("navTitle")} linksList={navItems} />
            <FooterSection title={t("clientTitle")} linksList={clientItems} />
            <FooterSocialSection title={t("socialTitle")} linksList={socialMedia} />
          </div>
          <div className="border-border/20 text-popover-foreground flex justify-between border-t pt-7">
            <p className="text-[13.5px] lg:text-[14px]">
              {t("developerCredit")}{" "}
              <span className="text-accent-foreground text-[14px] lg:text-base">
                Jakub Rafalski
              </span>
            </p>
            <p className="hidden lg:block">{`© ${getCurrentYear()} ${siteConfig.name}. ${t("rights")}`}</p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
