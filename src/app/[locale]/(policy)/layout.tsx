import { PrivacyFooter } from "@/components/shared/footer/footer";
import { HeaderPrivacy } from "@/components/shared/header/headers";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderPrivacy />
      {children}
      <PrivacyFooter />
    </>
  );
}
