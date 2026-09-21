import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { resend } from "./resend";
import { siteConfig } from "@/config/site";
import { ForeignUserTemplate } from "@/components/template/foreignUserTemplate";
import { ResetPasswordTemplate } from "@/components/template/resetPasswordTemplate";
import { VerifyEmailTemplate } from "@/components/template/verifyEmailTemplate";
import { PasswordChangedTemplate } from "@/components/template/passwordChangedTemplate";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { render } from "@react-email/render";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

function getLocaleFromRequest(request?: Request) {
  const referer = request?.headers.get("referer");

  if (!referer) {
    return routing.defaultLocale;
  }

  const segment = URL.parse(referer)?.pathname.split("/")[1];

  return hasLocale(routing.locales, segment) ? segment : routing.defaultLocale;
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    onExistingUserSignUp: async ({ user }, request) => {
      const locale = getLocaleFromRequest(request);
      const t = await getTranslations({ locale, namespace: "Emails.ExistingAccount" });

      const email = ForeignUserTemplate({
        locale,
        preview: t("preview"),
        heading: t("heading"),
        paragraphs: [t("greeting", { name: user.name }), t("intro")],
        button: {
          label: t("button"),
          url: `${process.env.BETTER_AUTH_URL}${getPathname({ href: "/login", locale })}`,
        },
        link: {
          label: t("resetLink"),
          url: `${process.env.BETTER_AUTH_URL}${getPathname({ href: "/reset-password", locale })}`,
        },
        footnote: t("ignore"),
      });

      const { error } = await resend.emails.send({
        from: `${siteConfig.name} <contact@rafalski.dev>`,
        to: user.email,
        subject: t("subject"),
        react: email,
        text: await render(email, { plainText: true }),
      });

      if (error) {
        console.error("onExistingUserSignUp:", error);
      }
    },
    sendResetPassword: async ({ user, url }, request) => {
      const locale = getLocaleFromRequest(request);
      const t = await getTranslations({ locale, namespace: "Emails.ResetPassword" });

      const email = ResetPasswordTemplate({
        locale,
        resetUrl: url,
        messages: {
          preview: t("preview"),
          heading: t("heading"),
          greeting: t("greeting", { name: user.name }),
          intro: t("intro"),
          button: t("button"),
          expiry: t("expiry"),
          fallback: t("fallback"),
          ignore: t("ignore"),
        },
      });

      const { error } = await resend.emails.send({
        from: `${siteConfig.name} <contact@rafalski.dev>`,
        to: user.email,
        subject: t("subject"),
        react: email,
        text: await render(email, { plainText: true }),
      });

      if (error) {
        console.error("sendResetPassword:", error);
      }
    },
    onPasswordReset: async ({ user }, request) => {
      const locale = getLocaleFromRequest(request);
      const t = await getTranslations({ locale, namespace: "Emails.PasswordChanged" });

      const email = PasswordChangedTemplate({
        locale,
        loginUrl: `${process.env.BETTER_AUTH_URL}${getPathname({ href: "/login", locale })}`,
        messages: {
          preview: t("preview"),
          heading: t("heading"),
          greeting: t("greeting", { name: user.name }),
          intro: t("intro"),
          sessions: t("sessions"),
          button: t("button"),
          warning: t("warning"),
        },
      });

      const { error } = await resend.emails.send({
        from: `${siteConfig.name} <contact@rafalski.dev>`,
        to: user.email,
        subject: t("subject"),
        react: email,
        text: await render(email, { plainText: true }),
      });

      if (error) {
        console.error("onPasswordReset:", error);
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }, request) => {
      const locale = getLocaleFromRequest(request);
      const t = await getTranslations({ locale, namespace: "Emails.VerifyEmail" });

      const email = VerifyEmailTemplate({
        locale,
        verifyUrl: url,
        messages: {
          preview: t("preview"),
          heading: t("heading"),
          greeting: t("greeting", { name: user.name }),
          intro: t("intro"),
          button: t("button"),
          expiry: t("expiry"),
          fallback: t("fallback"),
          ignore: t("ignore"),
        },
      });

      const { error } = await resend.emails.send({
        from: `${siteConfig.name} <contact@rafalski.dev>`,
        to: user.email,
        subject: t("subject"),
        react: email,
        text: await render(email, { plainText: true }),
      });

      if (error) {
        console.error("sendVerificationEmail:", error);
      }
    },
  },
});
