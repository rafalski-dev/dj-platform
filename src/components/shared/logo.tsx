import { cn } from "@/lib/utils";
import { LogoProps } from "@/types/sharedComponents";
import { AudioLines } from "lucide-react";
import Link from "next/link";

export function Logo({ iconSize, className }: LogoProps) {
  return (
    <Link href="/" className={cn(`flex items-center gap-2 lg:gap-3`, className)}>
      <AudioLines size={iconSize} className="text-accent" />
      <span className="font-serif tracking-wider">Maven</span>
    </Link>
  );
}
