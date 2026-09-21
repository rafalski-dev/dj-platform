"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { getPathname, Link, redirect, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { getErrorTranslation } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

function VerifyEmailCard() {
  const locale = useLocale();
  const t = useTranslations("Auth");
  const [count, setCount] = useState(20);
  const isBtnDisable = count > 0;
  const email = useSearchParams().get("email");
  const router = useRouter();

  if (!email) {
    redirect({ href: "/login", locale });
  }

  useEffect(() => {
    async function check() {
      if (document.hidden) return;
      const { data } = await authClient.getSession();
      if (data) router.replace({ pathname: "/dashboard" });
    }
    check();
    document.addEventListener("visibilitychange", check);

    return () => document.removeEventListener("visibilitychange", check);
  }, [router]);

  useEffect(() => {
    if (count === 0) return;

    const id = setTimeout(() => setCount((prev) => prev - 1), 1000);

    return () => clearTimeout(id);
  }, [count]);

  async function onResendVerificationClick() {
    if (!email) return;
    setCount(60);

    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: getPathname({ href: "/welcome", locale }),
    });

    if (error) {
      toast.add({
        type: "error",
        title: t("VerifyEmail.form.server.error.title"),
        description: t(`Errors.${getErrorTranslation(error)}`),
        timeout: 8000,
      });
      return;
    }

    toast.add({
      type: "warning",
      title: t("VerifyEmail.form.server.success.title"),
      description: t("VerifyEmail.form.server.success.description"),
      timeout: 8000,
    });
  }

  return (
    <Card className="w-full max-w-115 overflow-visible bg-transparent ring-0">
      <CardHeader className="border-border/15 flex w-full flex-col border-b px-0">
        <div className="text-primary text-xs font-medium tracking-[3px] uppercase lg:text-sm">
          {t("VerifyEmail.label")}
        </div>
        <h1 className="font-serif text-[36px] leading-normal font-medium md:text-[40px] lg:text-[44px]">
          {t("VerifyEmail.title")}
        </h1>
        <CardDescription>{t("VerifyEmail.description")}</CardDescription>
      </CardHeader>
      <CardContent className="border-border/15 mb-6 flex w-full flex-col items-center justify-center gap-6 px-0">
        <div className="flex w-full flex-col gap-5">
          <p className="text-popover-foreground text-[15px]">{t("VerifyEmail.extraMessage")}</p>
          <Button
            type="button"
            className="w-full text-[15px]"
            onClick={onResendVerificationClick}
            disabled={isBtnDisable}
          >
            {isBtnDisable ? (
              <>
                {t("VerifyEmail.disableBtn")} {count} s
              </>
            ) : (
              <>{t("VerifyEmail.primaryBtn")}</>
            )}
          </Button>
        </div>
        <div className="flex gap-2">
          <p className="text-muted-foreground">{t("VerifyEmail.footer")}</p>
          <Link
            href="/login"
            className="text-accent-foreground hover:text-accent-foreground/90 font-medium duration-200"
          >
            {t("VerifyEmail.loginLink")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense>
      <VerifyEmailCard />
    </Suspense>
  );
}
