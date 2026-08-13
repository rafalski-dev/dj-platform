import { navItems } from "@/constants/navigations";
import { Wrapper } from "../wrapper";
import { NavDesktop, NavMobile } from "./nav";
import { Logo } from "../logo";

export function Header() {
  return (
    <header
      className={
        "bg-background/70 border-border/20 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md"
      }
    >
      <Wrapper>
        <div className={"flex items-center justify-between py-4"}>
          <div className="flex w-full items-center">
            <Logo iconSize="24" className="text-[24px] lg:text-[18px]" />
            <div className="hidden w-full lg:block">
              <NavDesktop navItems={navItems} />
            </div>
          </div>
          <div className="lg:hidden">
            <NavMobile navItems={navItems} />
          </div>
        </div>
      </Wrapper>
    </header>
  );
}
