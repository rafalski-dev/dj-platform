import { HeaderAuth } from "@/components/shared/header/header";
import { Wrapper } from "@/components/shared/wrapper";
import Image from "next/image";
import authImg from "../../../assets/images/gallery/crowd-dancing-with-dj.jpg";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-dvh w-full grid-cols-1 gap-x-10 lg:grid-cols-2">
      <div className="border-border/15 relative hidden w-full border-r p-10 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:items-end lg:justify-start">
        <Image src={authImg} fill className="-z-10 object-cover" alt="" priority sizes="50vw" />
        <div className="bg-background/40 absolute inset-0 h-full w-full" />
      </div>
      <div className="relative flex w-full pt-18">
        <HeaderAuth />
        <Wrapper className="flex items-center justify-center">{children}</Wrapper>
      </div>
    </main>
  );
}
