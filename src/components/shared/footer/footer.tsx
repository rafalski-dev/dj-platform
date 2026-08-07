import { clientItems, navItems } from "@/constants/navigations";
import { Logo } from "../logo";
import { Wrapper } from "../wrapper";
import { FooterSection } from "./footerSection";

export function Footer() {
  function showYear() {
    const date = new Date();
    const year = date.getFullYear();
    console.log(year);
  }
  showYear();
  return (
    <footer className="border-border/20 border-t pt-17 pb-10">
      <Wrapper>
        <div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Logo size="text-[24px]" />
              <p className="text-popover-foreground max-w-75">
                {`Years of experience, one goal - making sure every party is unforgettable. Book now
                and let's celebrate.`}
              </p>
            </div>
            <FooterSection title="Navigation" linksList={navItems} />
            <FooterSection title="Client" linksList={clientItems} />
          </div>
          <div>
            <p>Webpage built and manage by rafalski.dev</p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
