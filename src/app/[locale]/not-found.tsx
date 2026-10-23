import { GlowOrb } from "@/components/ui/decorations/glowOrbs";
import { Logo } from "@/components/shared/logo";
import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/shadcn/button";
import { Link } from "@/i18n/navigation";
import { HomeIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFoundPage");

  return (
    <main className="relative flex min-h-dvh w-full items-center overflow-hidden">
      <GlowOrb className="top-1/2 left-1/2 size-[480px] -translate-1/2" />
      <Wrapper className="flex flex-col items-center justify-center gap-10 py-16 text-center">
        <Logo href="/" iconSize={22} className="text-[24px]" />
        <div className="flex max-w-115 flex-col items-center gap-4">
          <p
            aria-hidden="true"
            className="from-gold-light to-gold-dark bg-linear-120 bg-clip-text font-serif text-[120px] leading-none font-medium text-transparent md:text-[160px]"
          >
            404
          </p>
          <h1 className="font-serif text-[36px] leading-normal font-medium md:text-[40px] lg:text-[44px]">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <Button
          className="w-full max-w-80 text-[15px]"
          nativeButton={false}
          render={<Link href="/" />}
        >
          <HomeIcon />
          {t("action")}
        </Button>
      </Wrapper>
    </main>
  );
}
