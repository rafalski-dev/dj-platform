"use client";

import { ControlledInput } from "@/components/shared/form/inputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { Link, redirect, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { getErrorTranslation } from "@/lib/utils";
import { createNewPasswordSchema } from "@/validation/newPasword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

function NewPasswordCard() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth");
  const schema = useMemo(() => createNewPasswordSchema(t), [t]);

  type NewPaswordType = z.infer<typeof schema>;
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<NewPaswordType>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const expired = searchParams.get("error") === "INVALID_TOKEN";

  if (expired) {
    redirect({ href: "/url-expired", locale });
  }

  if (!token) {
    redirect({ href: "/login", locale });
  }

  async function onSubmit(data: NewPaswordType) {
    if (!token) return;

    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token,
    });

    if (error) {
      toast.add({
        type: "error",
        title: t("NewPassword.form.server.error.title"),
        description: t(`Errors.${getErrorTranslation(error)}`),
        timeout: 8000,
      });
      return;
    }

    toast.add({
      type: "success",
      title: t("NewPassword.form.server.success.title"),
      description: t("NewPassword.form.server.success.description"),
      timeout: 8000,
    });
    router.replace({ pathname: "/login" });
  }
  return (
    <Card className="w-full max-w-115 overflow-visible bg-transparent ring-0">
      <CardHeader className="border-border/15 flex w-full flex-col border-b px-0">
        <div className="text-primary text-xs font-medium tracking-[3px] uppercase lg:text-sm">
          {t("NewPassword.label")}
        </div>
        <h1 className="font-serif text-[36px] leading-normal font-medium md:text-[40px] lg:text-[44px]">
          {t("NewPassword.title")}
        </h1>
        <CardDescription>{t("NewPassword.description")}</CardDescription>
      </CardHeader>
      <CardContent className="border-border/15 flex w-full flex-col items-center justify-center gap-6 px-0">
        <form id="new-password-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex w-full flex-col gap-4">
            <ControlledInput
              name="password"
              control={control}
              label={t("NewPassword.form.password.label")}
              type="password"
              autoComplete="new-password"
            />
            <ControlledInput
              name="confirmPassword"
              control={control}
              label={t("NewPassword.form.confirmPassword.label")}
              type="password"
              autoComplete="new-password"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 px-0">
        <div className="flex w-full flex-col gap-5">
          <Button
            form="new-password-form"
            type="submit"
            disabled={isSubmitting}
            className="w-full text-[15px]"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                {t("NewPassword.pendingBtn")}
              </>
            ) : (
              <>{t("NewPassword.primaryBtn")}</>
            )}
          </Button>
        </div>
        <div className="flex gap-2">
          <p className="text-muted-foreground">{t("NewPassword.footer")}</p>
          <Link
            href="/login"
            className="text-accent-foreground hover:text-accent-foreground/90 font-medium duration-200"
          >
            {t("NewPassword.loginLink")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function NewPassword() {
  return (
    <Suspense>
      <NewPasswordCard />
    </Suspense>
  );
}
