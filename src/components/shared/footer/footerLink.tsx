import { Link } from "@/i18n/navigation";
import { FooterLinkProps } from "@/types/footer";
import { getTranslations } from "next-intl/server";

export async function FooterLink({ navKey, path }: FooterLinkProps) {
  const t = await getTranslations("LandingPage.Navigation");
  const isAnchor = path.startsWith("#");
  const className =
    "text-popover-foreground hover:text-accent-foreground text-[14.5px] font-normal transition-colors";

  if (isAnchor)
    return (
      <Link href={`/${path}`} className={className}>
        {t(navKey)}
      </Link>
    );

  return (
    <Link href={path} className={className}>
      {t(navKey)}
    </Link>
  );
}
