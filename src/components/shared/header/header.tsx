import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Wrapper } from "../wrapper";
import { useState } from "react";

const NAV_ITEMS = [
  { id: 1, name: "About me", path: "#about-me" },
  { id: 2, name: "Services", path: "#services" },
  { id: 3, name: "Reviews", path: "#reviews" },
  { id: 4, name: "Contact", path: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header
      className={
        "bg-background/70 border-border/20 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md"
      }
    >
      <Wrapper>
        <div className={"flex items-center justify-between py-4"}>
          <Link href="/" className="text-primary font-serif text-[22px]">
            Logo
          </Link>
        </div>
      </Wrapper>
    </header>
  );
}
