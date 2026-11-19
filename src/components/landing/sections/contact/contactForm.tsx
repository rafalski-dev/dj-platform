"use client";

import { ControlledCheckbox } from "@/components/shared/form/checkboxField";
import { ControlledDatePicker } from "@/components/shared/form/dateTimeField";
import { ControlledInput } from "@/components/shared/form/inputFields";
import { ControlledSelect } from "@/components/shared/form/selectField";
import { ControlledTextarea } from "@/components/shared/form/textareaField";
import { Button } from "@/components/ui/shadcn/button";
import { FieldDescription, FieldGroup } from "@/components/ui/shadcn/field";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { eventTypeKeys } from "@/constants/contact";
import { Link } from "@/i18n/navigation";
import { cn, getStartOfToday } from "@/lib/utils";
import { ContactFormStep } from "@/types/contact";
import { ContactSchema, createContactSchema } from "@/validation/landing";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../../../shared/form/formError";
import { checkDateAction, sendContactFormAction } from "@/actions/landing";
import { ContactFormSuccess } from "./contactFormSuccess";
import { ContactFormBusy } from "./contactFormBusy";

type ContactFormProps = {
  className?: string;
  // date already checked in the hero – the form starts at details (free) or busy
  initialDate?: Date;
  initialStep?: ContactFormStep;
  // client panel: filled in from the logged-in account
  initialContact?: Partial<Pick<ContactSchema, "firstName" | "lastName" | "email">>;
  // client panel: takes over after sending (instead of the thank-you view)
  onSuccess?: (message: string) => void;
};

export function ContactForm({
  className,
  initialDate,
  initialStep = "date",
  initialContact,
  onSuccess,
}: ContactFormProps) {
  const t = useTranslations("LandingPage.Contact.contactForm");
  const format = useFormatter();
  const schema = useMemo(() => createContactSchema(t), [t]);
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState<ContactFormStep>(initialStep);
  const [isChecking, setIsChecking] = useState(false);
  const successForm = useRef<HTMLDivElement>(null);

  function onSendAgainClick() {
    setSuccess("");
    setStep("date");
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
    trigger,
    getValues,
    register,
    formState: { isSubmitting, errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      eventDate: initialDate,
      firstName: initialContact?.firstName ?? "",
      lastName: initialContact?.lastName ?? "",
      email: initialContact?.email ?? "",
      phone: "",
      eventType: undefined,
      place: "",
      message: "",
      terms: false,
      website: "",
    },
  });

  async function onCheckDate() {
    clearErrors("root.serverError");
    const isValid = await trigger("eventDate");
    if (!isValid) return;

    setIsChecking(true);
    const res = await checkDateAction(getValues("eventDate"));
    setIsChecking(false);

    if (res.success) return setStep("details");
    if (res.status === "busy") return setStep("busy");

    setError("root.serverError", { message: res.message });
  }

  async function onSubmit(formData: ContactSchema) {
    clearErrors("root.serverError");
    const res = await sendContactFormAction(formData);

    if (res.success) {
      if (onSuccess) return onSuccess(res.message);
      setSuccess(res.message);
      reset();
      return;
    }

    if (res.status === "busy") return setStep("busy");

    setError("root.serverError", { message: res.message });

    if (res.status === "invalid" && res.errors) {
      Object.entries(res.errors).forEach(([field, message]) => {
        setError(field as keyof ContactSchema, { message: message?.[0] });
      });
    }
  }

  const errorMessage = errors.root?.serverError
    ? errors.root?.serverError.message
    : Object.keys(errors).length > 0 && step === "details"
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

  if (step === "busy")
    return (
      <ContactFormBusy
        title={t("busy.title")}
        description={t("busy.description")}
        callBtnMessage={t("busy.callButton")}
        otherDateBtnMessage={t("busy.otherDateButton")}
        handleOtherDate={() => setStep("date")}
      />
    );

  return (
    <div className={cn("border-border bg-card rounded-2xl border p-5 md:p-6 lg:p-7", className)}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {step === "date" ? (
            <>
              <ControlledDatePicker
                name="eventDate"
                control={control}
                label={t("formInputs.eventDate.label")}
                placeholder={t("formInputs.eventDate.placeholder")}
                disabled={{ before: getStartOfToday() }}
                required
              />
              {errorMessage && <FormError error={errorMessage} />}
              <Button disabled={isChecking} className="my-3 w-full" onClick={onCheckDate}>
                {isChecking ? (
                  <>
                    <Spinner />
                    {t("dateStep.checkingButton")}
                  </>
                ) : (
                  <>{t("dateStep.checkButton")}</>
                )}
              </Button>
              <FieldDescription className="text-popover-foreground/80 text-xs">
                {t("dateStep.description")}
              </FieldDescription>
            </>
          ) : (
            <>
              <div className="border-success-border bg-success-bg flex items-center justify-between gap-3 rounded-lg border px-4 py-3">
                <p className="text-success-text flex items-center gap-2 text-sm">
                  <CalendarCheck size={18} className="shrink-0" />
                  {t("dateStep.free", {
                    date: format.dateTime(getValues("eventDate"), { dateStyle: "long" }),
                  })}
                </p>
                <Button variant="link" size="sm" onClick={() => setStep("date")}>
                  {t("dateStep.changeButton")}
                </Button>
              </div>
              <div className="flex flex-col gap-2.5 md:flex-row">
                <ControlledInput
                  name="firstName"
                  control={control}
                  label={t("formInputs.firstName.label")}
                  placeholder={t("formInputs.firstName.placeholder")}
                  autoComplete="given-name"
                  required
                />
                <ControlledInput
                  name="lastName"
                  control={control}
                  label={t("formInputs.lastName.label")}
                  placeholder={t("formInputs.lastName.placeholder")}
                  autoComplete="family-name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2.5 md:flex-row">
                <ControlledInput
                  name="email"
                  control={control}
                  label={t("formInputs.email.label")}
                  placeholder={t("formInputs.email.placeholder")}
                  autoComplete="email"
                  type="email"
                  required
                />
                <ControlledInput
                  name="phone"
                  control={control}
                  label={t("formInputs.phone.label")}
                  placeholder={t("formInputs.phone.placeholder")}
                  autoComplete="tel"
                  type="tel"
                  required
                />
              </div>
              <ControlledSelect
                name="eventType"
                control={control}
                label={t("formInputs.eventType.label")}
                placeholder={t("formInputs.eventType.placeholder")}
                items={eventTypeKeys.map(({ labelKey, value }) => ({
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
                // venue address, not the client's – Chrome ignores "off" on address-like
                // fields, an unknown token stops it from autofilling the home address
                autoComplete="event-venue"
                required
              />
              <ControlledTextarea
                name="message"
                control={control}
                label={t("formInputs.message.label")}
                placeholder={t("formInputs.message.placeholder")}
                hint={t("formInputs.message.hint")}
                className="min-h-30"
              />

              {/* honeypot – off-screen for people, bots fill it in */}
              <div aria-hidden className="absolute -left-[9999px]">
                <input {...register("website")} tabIndex={-1} autoComplete="off" />
              </div>

              <ControlledCheckbox
                name="terms"
                control={control}
                label={
                  // span keeps the text and the link in one line flow (FieldLabel is flex)
                  <span>
                    {t.rich("formInputs.terms.label", {
                      // new tab, so the filled-in form isn't lost
                      link: (chunks) => (
                        <Link
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </span>
                }
              />
              {errorMessage && <FormError error={errorMessage} />}
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
            </>
          )}
        </FieldGroup>
      </form>
    </div>
  );
}
