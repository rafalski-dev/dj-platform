import { FooterSectionProps } from "@/types/footer";
import { FooterLink } from "./footerLink";
import { getTranslations } from "next-intl/server";

export async function FooterSection({ title, linksList }: FooterSectionProps) {
  const t = await getTranslations("LandingPage.Header.navItems");
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[20px] lg:text-[22px]">{title}</h3>
      <ul className="flex flex-col gap-3">
        {linksList.map(({ navKey, path }) => (
          <li key={navKey}>
            <FooterLink navKey={t(navKey)} path={path} />
          </li>
        ))}
      </ul>
    </div>
  );
}
