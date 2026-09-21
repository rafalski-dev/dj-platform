"use client";

import { GoogleIcon } from "@/components/icons/googleIcon";
import { ControlledCheckbox } from "@/components/shared/form/checkboxField";
import { ControlledInput } from "@/components/shared/form/inputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { getPathname, Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { getErrorTranslation } from "@/lib/utils";
import { createLoginSchema } from "@/validation/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

function LoginCard() {
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Auth");
  const schema = useMemo(() => createLoginSchema(t), [t]);
  const loginError = useSearchParams().get("error");

  useEffect(() => {
    if (!loginError) return;

    if (loginError === "account_not_linked") {
      toast.add({
        type: "warning",
        title: t("Login.form.server.alreadyExist.title"),
        description: t("Login.form.server.alreadyExist.description"),
        timeout: 8000,
      });
    } else {
      toast.add({
        type: "error",
        title: t("Login.form.server.error.title"),
        description: t("Login.form.server.error.description"),
        timeout: 8000,
      });
    }

    router.replace({ pathname: "/login" });
  }, [loginError, t, router]);

  type LoginValues = z.infer<typeof schema>;

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(formData: LoginValues) {
    const { error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    });

    if (error?.code === "EMAIL_NOT_VERIFIED") {
      toast.add({
        type: "warning",
        title: t("Login.form.server.verify.title"),
        description: t("Login.form.server.verify.description"),
        timeout: 8000,
      });
      router.replace({ pathname: "/verify-email", query: { email: formData.email } });
      return;
    }

    if (error) {
      toast.add({
        type: "error",
        title: t("Login.form.server.error.title"),
        description: t(`Errors.${getErrorTranslation(error)}`),
        timeout: 8000,
      });
      return;
    }

    toast.add({
      type: "success",
      title: t("Login.form.server.success.title"),
      description: t("Login.form.server.success.description"),
      timeout: 8000,
    });
    router.replace({ pathname: "/dashboard" });
  }

  async function signInWithGoogle() {
    setIsGoogleSubmitting(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: getPathname({ href: "/dashboard", locale }),
      errorCallbackURL: getPathname({ href: "/login", locale }),
    });

    if (error) {
      setIsGoogleSubmitting(false);
      toast.add({
        type: "error",
        title: t("Login.form.server.error.title"),
        description: t(`Errors.${getErrorTranslation(error)}`),
        timeout: 8000,
      });
    }
  }

  return (
    <Card className="w-full max-w-115 overflow-visible bg-transparent ring-0">
      <CardHeader className="flex w-full flex-col px-0">
        <div className="text-primary text-xs font-medium tracking-[3px] uppercase lg:text-sm">
          {t("Login.label")}
        </div>
        <h1 className="font-serif text-[36px] leading-normal font-medium md:text-[40px] lg:text-[44px]">
          {t("Login.title")}
        </h1>
        <CardDescription>{t("Login.description")}</CardDescription>

        <Button
          className="my-5 w-full gap-3 text-[15px]"
          variant="outline"
          type="button"
          disabled={isGoogleSubmitting || isSubmitting}
          onClick={signInWithGoogle}
        >
          <GoogleIcon />
          {t("Login.googleBtn")}
        </Button>
        <Separator />
      </CardHeader>
      <CardContent className="px-0">
        <form noValidate id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <ControlledInput
              name="email"
              control={control}
              label={t("Login.form.email.label")}
              placeholder={t("Login.form.email.placeholder")}
              autoComplete="email"
              type="email"
            />
            <ControlledInput
              name="password"
              control={control}
              label={t("Login.form.password.label")}
              autoComplete="current-password"
              type="password"
              forgotPassword
            />
            <ControlledCheckbox
              name="rememberMe"
              control={control}
              label={t("Login.form.rememberMe.label")}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-5 px-0">
        <Button
          disabled={isGoogleSubmitting || isSubmitting}
          form="login-form"
          type="submit"
          className="w-full text-[15px]"
        >
          {isSubmitting ? (
            <>
              <Spinner />
              {t("Login.pendingBtn")}
            </>
          ) : (
            t("Login.primaryBtn")
          )}
        </Button>
        <div className="flex gap-2">
          <p className="text-muted-foreground">{t("Login.footer")}</p>
          <Link
            href="/register"
            className="text-accent-foreground hover:text-accent-foreground/90 font-medium duration-200"
          >
            {t("Login.signupLink")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function Login() {
  return (
    <Suspense>
      <LoginCard />
    </Suspense>
  );
}
