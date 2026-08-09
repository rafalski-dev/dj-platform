import { Link } from "@/i18n/navigation";
import { FooterLinkProps } from "@/types/footer";

export function FooterLink({ navKey, path }: FooterLinkProps) {
  const isAnchor = path.startsWith("#");
  const className =
    "text-popover-foreground hover:text-accent-foreground text-[14.5px] font-normal transition-colors lg:text-base";

  if (isAnchor)
    return (
      <Link href={`/${path}`} className={className}>
        {navKey}
      </Link>
    );

  return (
    <Link href={path} className={className}>
      {navKey}
    </Link>
  );
}
