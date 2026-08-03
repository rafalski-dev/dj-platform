import { NavItem } from "@/types/navigation";
import { Wrapper } from "../wrapper";
import { NavMobile } from "./nav";
import Link from "next/link";

const navItems: NavItem[] = [
  { label: "About me", path: "#about-me" },
  { label: "Services", path: "#services" },
  { label: "Reviews", path: "#reviews" },
  { label: "Contact", path: "#contact" },
];

export function Header() {
  return (
    <header
      className={
        "bg-background/70 border-border/20 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md"
      }
    >
      <Wrapper>
        <div className={"flex items-center justify-between py-4"}>
          <Link href="/" className="text-primary font-serif">
            <div className="flex items-center gap-3 text-[25px] md:text-[28px]">Logo</div>
          </Link>
          <div className="lg:hidden">
            <NavMobile navItems={navItems} />
          </div>
        </div>
      </Wrapper>
    </header>
  );
}
