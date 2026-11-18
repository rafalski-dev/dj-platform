import { Wrapper } from "@/components/shared/wrapper";
import { Logo } from "@/components/shared/logo";
import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { getSession } from "@/lib/auth-helpers";
import { createInitials } from "@/lib/utils";
import { NavigationClientMobile } from "@/components/client/layout/navigation/navigationMobile";

export async function HeaderClient() {
  const session = await getSession();
  const clientName = session?.user.name ?? "";
  const clientEmail = session?.user.email ?? "";

  return (
    <header className="bg-background/70 border-border fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md print:hidden">
      <Wrapper>
        <div className="flex items-center justify-between py-4">
          <div className="flex w-full items-center">
            <Logo
              href="/dashboard"
              iconSize={22}
              className="mb-0.75 w-30 text-[24px] lg:text-[20px]"
            />
          </div>
          <div className="hidden lg:block">
            <div className="flex flex-row items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback>{createInitials(clientName)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-foreground text-nowrap">{clientName}</div>
                <div className="text-popover-foreground text-xs font-light tracking-wider">
                  {clientEmail}
                </div>
              </div>
            </div>
          </div>
          <NavigationClientMobile display="lg:hidden" />
        </div>
      </Wrapper>
    </header>
  );
}
