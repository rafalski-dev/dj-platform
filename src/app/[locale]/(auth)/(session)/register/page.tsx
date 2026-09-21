"use client";

import { GoogleIcon } from "@/components/icons/googleIcon";
import { ControlledCheckbox } from "@/components/shared/form/checkboxField";
import { ControlledInput } from "@/components/shared/form/inputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { getPathname, Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { getErrorTranslation } from "@/lib/utils";
import { createRegisterSchema } from "@/validation/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function Register() {
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Auth");
  const schema = useMemo(() => createRegisterSchema(t), [t]);
  type RegisterTypes = z.infer<typeof schema>;

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterTypes>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(formData: RegisterTypes) {
    const { error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: `${formData.firstName} ${formData.lastName}`,
      callbackURL: getPathname({ href: "/welcome", locale }),
    });

    if (error) {
      toast.add({
        type: "error",
        title: t("Register.form.server.error.title"),
        description: t(`Errors.${getErrorTranslation(error)}`),
        timeout: 8000,
      });
      return;
    }

    toast.add({
      type: "success",
      title: t("Register.form.server.success.title"),
      description: t("Register.form.server.success.description"),
      timeout: 8000,
    });

    router.replace({ pathname: "/verify-email", query: { email: formData.email } });
  }

  async function signInWithGoogle() {
    setIsGoogleSubmitting(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: getPathname({ href: "/dashboard", locale }),
      errorCallbackURL: getPathname({ href: "/login", locale }),
    });

    if (error) {
      toast.add({
        type: "error",
        title: t("Register.form.server.error.title"),
        description: t(`Errors.${getErrorTranslation(error)}`),
        timeout: 8000,
      });
      setIsGoogleSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-115 overflow-visible bg-transparent ring-0">
      <CardHeader className="flex w-full flex-col px-0">
        <div className="text-primary text-xs font-medium tracking-[3px] uppercase lg:text-sm">
          {t("Register.label")}
        </div>
        <h1 className="font-serif text-[36px] leading-normal font-medium md:text-[40px] lg:text-[44px]">
          {t("Register.title")}
        </h1>
        <CardDescription>{t("Register.description")}</CardDescription>

        <Button
          className="my-5 w-full gap-3 text-[15px]"
          variant="outline"
          type="button"
          onClick={signInWithGoogle}
          disabled={isSubmitting || isGoogleSubmitting}
        >
          <GoogleIcon />
          {t("Register.googleBtn")}
        </Button>
        <Separator />
      </CardHeader>
      <CardContent className="px-0">
        <form noValidate id="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <Field orientation="horizontal" className="items-start gap-4">
              <ControlledInput
                name="firstName"
                control={control}
                label={t("Register.form.firstName.label")}
                placeholder={t("Register.form.firstName.placeholder")}
                autoComplete="given-name"
                type="text"
              />
              <ControlledInput
                name="lastName"
                control={control}
                label={t("Register.form.lastName.label")}
                placeholder={t("Register.form.lastName.placeholder")}
                autoComplete="family-name"
                type="text"
              />
            </Field>
            <ControlledInput
              name="email"
              control={control}
              label={t("Register.form.email.label")}
              placeholder={t("Register.form.email.placeholder")}
              autoComplete="email"
              type="email"
            />
            <ControlledInput
              name="password"
              control={control}
              label={t("Register.form.password.label")}
              autoComplete="new-password"
              type="password"
            />
            <ControlledInput
              name="confirmPassword"
              control={control}
              label={t("Register.form.confirmPassword.label")}
              autoComplete="new-password"
              type="password"
            />
            <ControlledCheckbox
              name="terms"
              control={control}
              label={t("Register.form.terms.label")}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-5 px-0">
        <Button
          disabled={isSubmitting || isGoogleSubmitting}
          form="register-form"
          type="submit"
          className="w-full text-[15px]"
        >
          {isSubmitting ? (
            <>
              <Spinner />
              {t("Register.pendingBtn")}
            </>
          ) : (
            t("Register.primaryBtn")
          )}
        </Button>
        <div className="flex gap-2">
          <p className="text-muted-foreground">{t("Register.footer")}</p>
          <Link
            href="/login"
            className="text-accent-foreground hover:text-accent-foreground/90 font-medium duration-200"
          >
            {t("Register.loginLink")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
