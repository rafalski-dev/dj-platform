"use client";

import { subscribeNewsletterAction } from "@/actions/landing";
import { Button } from "@/components/ui/shadcn/button";
import { FieldGroup, Field, FieldError } from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { useActionState } from "react";
import { NewsletterSuccess } from "./newsletterSuccess";
import { initialState } from "@/constants/newsletter";
import { useTranslations } from "next-intl";

export function NewsletterForm() {
  const t = useTranslations("LandingPage.Newsletter");
  const [state, dispatchAction, isPending] = useActionState(
    subscribeNewsletterAction,
    initialState,
  );

  return (
    <form className="flex w-full flex-col items-center justify-center" action={dispatchAction}>
      {state.status === "success" ? (
        <NewsletterSuccess message={t("successMessage")} />
      ) : (
        <FieldGroup className="max-w-130 gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:gap-3">
            <Field>
              <Input
                className="h-12 rounded-lg px-5"
                defaultValue={state.providedEmail}
                required
                name="email"
                type="email"
                placeholder={t("placeholder")}
                aria-label={t("placeholder")}
                aria-invalid={!!state?.errors?.email}
              />
              {state?.errors?.email && (
                <FieldError className="px-6">{state.errors.email[0]}</FieldError>
              )}
            </Field>
            <Button disabled={isPending} className="w-full md:w-32" type="submit">
              {isPending ? (
                <>
                  <Spinner data-icon="inline-start" />
                  {t("btnProcessing")}
                </>
              ) : (
                <>{t("btnSignUp")}</>
              )}
            </Button>
          </div>

          {state.status === "error" && (
            <FieldError className="text-center">{state.serverError}</FieldError>
          )}
        </FieldGroup>
      )}
    </form>
  );
}
