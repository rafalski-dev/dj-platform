import { Wrapper } from "../shared/wrapper";
import { Logo } from "../shared/logo";
import { SideNavMobile } from "./sideNav";

export async function HeaderAdmin() {
  return (
    <header
      className={
        "bg-background/70 border-border/10 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md"
      }
    >
      <Wrapper>
        <div className={"flex items-center justify-between py-4"}>
          <div className="flex w-full items-center">
            <Logo href="/admin" iconSize={22} className="mb-0.75 w-30 text-[24px] lg:text-[20px]" />
          </div>
          <SideNavMobile />
        </div>
      </Wrapper>
    </header>
  );
}
