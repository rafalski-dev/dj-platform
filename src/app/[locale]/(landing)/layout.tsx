import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
