"use client";

import { ControlledCheckbox } from "@/components/shared/form/checkboxField";
import { ControlledInput } from "@/components/shared/form/inputField";
import { ControlledSelect } from "@/components/shared/form/selectField";
import { ControlledTextarea } from "@/components/shared/form/textareaField";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { eventTypeKeys } from "@/constants/contact";
import { cn } from "@/lib/utils";
import { ContactSchema, createContactSchema } from "@/validation/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFormError } from "./contactFormError";
import { handleContactForm } from "@/actions/contact";
import { ContactFormSuccess } from "./contactFormSuccess";

export function ContactForm({ className }: { className?: string }) {
  const t = useTranslations("LandingPage.Contact.contactForm");
  const schema = useMemo(() => createContactSchema(t), [t]);
  const [success, setSuccess] = useState("");
  const successForm = useRef<HTMLDivElement>(null);

  function onSendAgainClick() {
    setSuccess("");
  }

  useEffect(() => {
    if (success && successForm.current) {
      successForm.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [success]);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      eventDate: "",
      eventType: "",
      place: "",
      message: "",
      terms: false,
    },
  });

  async function onSubmit(formData: ContactSchema) {
    clearErrors("root.serverError");
    const res = await handleContactForm(formData);

    if (res.success) {
      setSuccess(res.message);
      reset();
      return;
    }

    setError("root.serverError", { message: res.message });

    if (res.errors) {
      Object.entries(res.errors).forEach(([field, message]) => {
        setError(field as keyof ContactSchema, { message: message?.[0] });
      });
    }
  }

  const errorMessage = errors.root?.serverError
    ? errors.root?.serverError.message
    : Object.keys(errors).length > 0
      ? t("serverMessage.validationError")
      : null;

  if (success)
    return (
      <ContactFormSuccess
        message={success}
        title={t("acknowledgement")}
        btnMessage={t("btnAgain")}
        ref={successForm}
        handleReset={onSendAgainClick}
      />
    );

  return (
    <div className={cn("border-border/20 bg-card rounded-2xl border p-5 md:p-6 lg:p-7", className)}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col gap-2.5 md:flex-row">
            <ControlledInput
              name="fullName"
              control={control}
              label={t("formInputs.fullName.label")}
              placeholder={t("formInputs.fullName.placeholder")}
              autoComplete="name"
              required
            />
            <ControlledInput
              name="email"
              control={control}
              label={t("formInputs.email.label")}
              placeholder={t("formInputs.email.placeholder")}
              autoComplete="email"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2.5 md:flex-row">
            <ControlledInput
              name="phone"
              control={control}
              label={t("formInputs.phone.label")}
              placeholder={t("formInputs.phone.placeholder")}
              autoComplete="tel"
              type="tel"
              required
            />
            <ControlledInput
              name="eventDate"
              control={control}
              label={t("formInputs.eventDate.label")}
              placeholder={t("formInputs.eventDate.placeholder")}
            />
          </div>
          <ControlledSelect
            name="eventType"
            control={control}
            label={t("formInputs.eventType.label")}
            placeholder={t("formInputs.eventType.placeholder")}
            list={eventTypeKeys.map(({ labelKey, value }) => ({
              label: t(`formInputs.eventType.options.${labelKey}`),
              value: value,
            }))}
            required
          />
          <ControlledInput
            name="place"
            control={control}
            label={t("formInputs.place.label")}
            placeholder={t("formInputs.place.placeholder")}
          />
          <ControlledTextarea
            name="message"
            control={control}
            label={t("formInputs.message.label")}
            placeholder={t("formInputs.message.placeholder")}
            hint={t("formInputs.message.hint")}
            required
          />

          <ControlledCheckbox name="terms" control={control} label={t("formInputs.terms.label")} />
          {errorMessage && <ContactFormError error={errorMessage} />}
          <Button disabled={isSubmitting} className="my-3 w-full" type="submit">
            {isSubmitting ? (
              <>
                <Spinner />
                {t("processButton")}
              </>
            ) : (
              <>{t("submitButton")}</>
            )}
          </Button>
          <FieldDescription className="text-popover-foreground/80 text-xs">
            {t("formDescription")}
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
