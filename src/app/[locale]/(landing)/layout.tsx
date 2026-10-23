import { Footer } from "@/components/landing/layout/footer/footer";
import { HeaderLandingpage } from "@/components/landing/layout/header/headers";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderLandingpage />
      {children}
      <Footer />
    </>
  );
}
