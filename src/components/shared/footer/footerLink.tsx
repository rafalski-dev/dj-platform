import { Link } from "@/i18n/navigation";
import { FooterLinkProps } from "@/types/footer";
import { ComponentProps } from "react";

export function FooterLink({ navKey, path }: FooterLinkProps) {
  const isAnchor = path.startsWith("#");
  const className =
    "text-popover-foreground hover:text-accent-foreground/90 text-[14.5px] font-normal transition-colors lg:text-base";

  if (isAnchor)
    return (
      <Link href={{ pathname: "/", hash: path.slice(1) }} className={className}>
        {navKey}
      </Link>
    );

  return (
    <Link href={path as ComponentProps<typeof Link>["href"]} className={className}>
      {navKey}
    </Link>
  );
}
