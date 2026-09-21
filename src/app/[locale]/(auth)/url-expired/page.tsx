"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UrlExpiredCard() {
  const t = useTranslations("Auth.UrlExpired");
  const searchError =
    useSearchParams().get("error") === "EXPIRED_EMAIL_VERIFICATION_URL"
      ? "verification"
      : "password";

  return (
    <Card className="w-full max-w-115 overflow-visible bg-transparent ring-0">
      <CardHeader className="border-border/15 flex w-full flex-col border-b px-0">
        <div className="text-primary text-xs font-medium tracking-[3px] uppercase lg:text-sm">
          {t("label")}
        </div>
        <h1 className="font-serif text-[36px] leading-normal font-medium md:text-[40px] lg:text-[44px]">
          {t("title")}
        </h1>
        <CardDescription>{t(`description.${searchError}`)}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-5 px-0">
        <div className="flex w-full flex-col gap-5">
          <Button
            className="w-full text-[15px]"
            render={<Link href={searchError === "verification" ? "/login" : "/reset-password"} />}
          >
            {t(`primaryBtn.${searchError}`)}
          </Button>
        </div>
        <div className="flex gap-2">
          <p className="text-muted-foreground">{t(`footer.${searchError}`)}</p>
          <Link
            href="/login"
            className="text-accent-foreground hover:text-accent-foreground/90 font-medium duration-200"
          >
            {t("loginLink")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function UrlExpired() {
  return (
    <Suspense>
      <UrlExpiredCard />
    </Suspense>
  );
}
