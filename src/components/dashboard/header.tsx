import { Wrapper } from "../shared/wrapper";
import { Logo } from "../shared/logo";
import { SideNavMobile } from "./sideNav";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getSession } from "@/lib/auth-helpers";

export async function HeaderAdmin() {
  const session = await getSession();
  const firstChar = session?.user.name.split(" ")[0].charAt(0);
  const lastChar = session?.user.name.split(" ")[1].charAt(0);
  const adminName = session?.user.name;
  const adminEmail = session?.user.email;

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
          <div className="hidden lg:block">
            <div className="flex">
              <div className="flex flex-row items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback>{`${firstChar}${lastChar}`}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-foreground text-nowrap">{adminName}</div>
                  <div className="text-popover-foreground text-xs font-light tracking-wider">
                    {adminEmail}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SideNavMobile display="lg:hidden" />
        </div>
      </Wrapper>
    </header>
  );
}
