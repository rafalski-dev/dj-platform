import { PrivacyFooter } from "@/components/shared/footer/footer";
import { PrivacyHeader } from "@/components/shared/header/header";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrivacyHeader />
      {children}
      <PrivacyFooter />
    </>
  );
}
