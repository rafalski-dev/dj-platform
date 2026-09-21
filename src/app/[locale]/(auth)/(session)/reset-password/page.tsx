"use client";

import { ControlledInput } from "@/components/shared/form/inputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { getPathname, Link } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { createResetPasswordSchema } from "@/validation/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ResetPassword() {
  const locale = useLocale();
  const t = useTranslations("Auth");
  const schema = useMemo(() => createResetPasswordSchema(t), [t]);
  const [count, setCount] = useState(0);
  const isBtnDisabled = count > 0;
  type ResetPasswordSchema = z.infer<typeof schema>;

  useEffect(() => {
    if (!count) return;

    const id = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [count]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ResetPasswordSchema) {
    const { error } = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: getPathname({ href: "/new-password", locale }),
    });

    if (error) {
      toast.add({
        type: "error",
        title: t("ResetPassword.form.server.error.title"),
        description: t("ResetPassword.form.server.error.description"),
        timeout: 8000,
      });

      return;
    }

    toast.add({
      type: "warning",
      title: t("ResetPassword.form.server.success.title"),
      description: t("ResetPassword.form.server.success.description"),
      timeout: 8000,
    });
    reset();
    setCount(30);
  }

  return (
    <Card className="w-full max-w-115 overflow-visible bg-transparent ring-0">
      <CardHeader className="border-border/15 flex w-full flex-col border-b px-0">
        <div className="text-primary text-xs font-medium tracking-[3px] uppercase lg:text-sm">
          {t("ResetPassword.label")}
        </div>
        <h1 className="font-serif text-[36px] leading-normal font-medium md:text-[40px] lg:text-[44px]">
          {t("ResetPassword.title")}
        </h1>
        <CardDescription>{t("ResetPassword.description")}</CardDescription>
      </CardHeader>
      <CardContent className="border-border/15 flex w-full flex-col items-center justify-center gap-6 px-0">
        <form
          noValidate
          id="reset-password-form"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          <ControlledInput
            name="email"
            control={control}
            placeholder={t("ResetPassword.form.email.placeholder")}
            label={t("ResetPassword.form.email.label")}
            type="email"
            autoComplete="email"
          />
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 px-0">
        <div className="flex w-full flex-col gap-5">
          <Button
            disabled={isSubmitting || isBtnDisabled}
            form="reset-password-form"
            type="submit"
            className="w-full text-[15px]"
          >
            {isBtnDisabled ? (
              <>
                {t("ResetPassword.disableBtn")} {count} s
              </>
            ) : isSubmitting ? (
              <>
                <Spinner />
                {t("ResetPassword.pendingBtn")}
              </>
            ) : (
              t("ResetPassword.primaryBtn")
            )}
          </Button>
        </div>
        <div className="flex gap-2">
          <p className="text-muted-foreground">{t("ResetPassword.footer")}</p>
          <Link
            href="/login"
            className="text-accent-foreground hover:text-accent-foreground/90 font-medium duration-200"
          >
            {t("ResetPassword.loginLink")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
