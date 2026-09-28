import { Footer } from "@/components/shared/footer/footer";
import { HeaderLandingpage } from "@/components/shared/header/headers";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderLandingpage />
      {children}
      <Footer />
    </>
  );
}
