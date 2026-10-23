import { PrivacyFooter } from "@/components/landing/layout/footer/footer";
import { HeaderPrivacy } from "@/components/landing/layout/header/headers";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderPrivacy />
      {children}
      <PrivacyFooter />
    </>
  );
}
