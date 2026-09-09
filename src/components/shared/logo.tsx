import { cn } from "@/lib/utils";
import { LogoProps } from "@/types/sharedComponents";
import { Link } from "@/i18n/navigation";
import { AudioLines } from "lucide-react";

export function Logo({ iconSize, className, href, ...rest }: LogoProps) {
  return (
    <Link href={href} className={cn(`flex items-center gap-2 lg:gap-3`, className)} {...rest}>
      <AudioLines size={iconSize} className="text-accent" />
      <span className="font-serif tracking-wider">Maven</span>
    </Link>
  );
}
