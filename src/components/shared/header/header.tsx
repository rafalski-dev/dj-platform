import { Link } from "@/i18n/navigation";
import { Menu, X, XIcon } from "lucide-react";
import { Wrapper } from "../wrapper";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@base-ui/react";
import { useTranslations } from "next-intl";

const NAV_ITEMS = [
  { id: 1, name: "About me", path: "#about-me" },
  { id: 2, name: "Services", path: "#services" },
  { id: 3, name: "Reviews", path: "#reviews" },
  { id: 4, name: "Contact", path: "#contact" },
];

export function Header() {
  const t = useTranslations("LandingPage.Header");
  return (
    <header
      className={
        "bg-background/70 border-border/20 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md"
      }
    >
      <Wrapper>
        <div className={"flex items-center justify-between py-4"}>
          <Link href="/" className="text-primary font-serif text-[25px]">
            Logo
          </Link>
          <Sheet>
            <SheetTrigger className="border-border/40 flex size-9.5 cursor-pointer items-center justify-center rounded-sm border bg-white/7 transition-colors hover:bg-white/12">
              <Menu className="text-primary" size={24} />
            </SheetTrigger>
            <SheetContent side="top" className="flex" showCloseButton={false}>
              <SheetHeader className="flex gap-5">
                <div className="flex items-center justify-between">
                  <Link href="/" className="text-primary font-serif text-[25px]">
                    Logo
                  </Link>
                  <SheetClose className="border-border/40 flex size-9.5 cursor-pointer items-center justify-center rounded-sm border bg-white/7 transition-colors hover:bg-white/12">
                    <XIcon className="text-primary" size={24} />
                  </SheetClose>
                </div>
                <nav className="flex flex-col">
                  {NAV_ITEMS.map(({ id, name, path }) => (
                    <Link
                      key={id}
                      href={path}
                      className="border-border/20 border-b py-3 font-serif text-3xl"
                    >
                      {name}
                    </Link>
                  ))}
                </nav>
              </SheetHeader>
              <SheetFooter>
                <Button>{t("signIn")}</Button>
                <Button>{t("availability")}</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </Wrapper>
    </header>
  );
}
