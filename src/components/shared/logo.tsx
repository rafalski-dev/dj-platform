import { cn } from "@/lib/utils";
import { LogoProps } from "@/types/shared";
import { AudioLines } from "lucide-react";
import Link from "next/link";

export function Logo({ iconSize, className }: LogoProps) {
  return (
    <Link href="/" className={cn(`flex w-30 items-center gap-2`, className)}>
      <AudioLines size={iconSize} className="text-accent" />
      <span className="text-accent tracking-wider">Maven</span>
    </Link>
  );
}
