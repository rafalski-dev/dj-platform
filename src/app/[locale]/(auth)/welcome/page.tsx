"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Link, redirect, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function WelcomeCard() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const [count, setCount] = useState(30);
  const error = useSearchParams().get("error");

  if (error) {
    redirect({
      href: { pathname: "/url-expired", query: { error: "EXPIRED_EMAIL_VERIFICATION_URL" } },
      locale,
    });
  }

  useEffect(() => {
    if (count === 0) {
      router.replace({ pathname: "/dashboard" });
      return;
    }

    const id = setTimeout(() => setCount((prev) => prev - 1), 1000);

    return () => clearTimeout(id);
  }, [count, router]);

  return (
    <Card className="w-full max-w-115 overflow-visible bg-transparent ring-0">
      <CardHeader className="border-border/15 flex w-full flex-col border-b px-0">
        <div className="text-primary text-xs font-medium tracking-[3px] uppercase lg:text-sm">
          {t("Welcome.label")}
        </div>
        <h1 className="font-serif text-[36px] leading-normal font-medium md:text-[40px] lg:text-[44px]">
          {t("Welcome.title")}
        </h1>
        <CardDescription>
          {t("Welcome.description")} <span className="text-accent">{`${count} s.`}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-border/15 mb-6 flex w-full flex-col items-center justify-center gap-6 px-0">
        <div className="flex w-full flex-col gap-5">
          <p className="text-popover-foreground text-[15px]">{t("Welcome.extraMessage")}</p>
          <Link
            href="/dashboard"
            className={cn("text-[15px]", buttonVariants({ variant: "default" }))}
          >
            {t("Welcome.primaryButton")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function Welcome() {
  return (
    <Suspense>
      <WelcomeCard />
    </Suspense>
  );
}
