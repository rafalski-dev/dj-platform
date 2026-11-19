"use client";

import { checkDateAction } from "@/actions/landing";
import { ControlledDatePicker } from "@/components/shared/form/dateTimeField";
import { FormError } from "@/components/shared/form/formError";
import { Button } from "@/components/ui/shadcn/button";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { siteConfig } from "@/config/site";
import { CONTACT_FORM_ID } from "@/constants/contact";
import { useInquiryContext } from "@/hooks/useInquiryContext";
import { getStartOfToday } from "@/lib/utils";
import { createEventDateSchema } from "@/validation/landing";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarX } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export function HeroDateCheck() {
  const t = useTranslations("LandingPage.Hero.dateCheck");
  const tForm = useTranslations("LandingPage.Contact.contactForm");
  const format = useFormatter();
  const { setCheckedDate } = useInquiryContext();
  const [busyDate, setBusyDate] = useState<Date | null>(null);
  const schema = useMemo(() => z.object({ eventDate: createEventDateSchema(tForm) }), [tForm]);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<{ eventDate: Date }>({ resolver: zodResolver(schema) });

  async function onSubmit({ eventDate }: { eventDate: Date }) {
    clearErrors("root.serverError");
    setBusyDate(null);
    const res = await checkDateAction(eventDate);

    if (res.success) {
      setCheckedDate((prev) => ({
        date: eventDate,
        status: "free",
        checkId: (prev?.checkId ?? 0) + 1,
      }));
      document.getElementById(CONTACT_FORM_ID)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (res.status === "busy") {
      // keep the contact form in sync – it shows the busy view too
      setCheckedDate((prev) => ({
        date: eventDate,
        status: "busy",
        checkId: (prev?.checkId ?? 0) + 1,
      }));
      return setBusyDate(eventDate);
    }

    setError("root.serverError", { message: res.message });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-140 flex-col">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="sm:flex-1">
          <ControlledDatePicker
            name="eventDate"
            control={control}
            placeholder={tForm("formInputs.eventDate.placeholder")}
            disabled={{ before: getStartOfToday() }}
          />
        </div>
        <Button disabled={isSubmitting} size="lg" className="h-11" type="submit">
          {isSubmitting ? (
            <>
              <Spinner />
              {tForm("dateStep.checkingButton")}
            </>
          ) : (
            <>{tForm("dateStep.checkButton")}</>
          )}
        </Button>
      </div>

      {busyDate && (
        <div
          role="status"
          className="border-destructive/60 bg-destructive/3 mt-3 flex gap-2 rounded-lg border px-4 py-3 text-[13.5px]"
        >
          <CalendarX size={18} className="text-destructive shrink-0" />
          <p>
            {t("busy", { date: format.dateTime(busyDate, { dateStyle: "long" }) })}{" "}
            <a
              href={`tel:${siteConfig.contact.number}`}
              className="text-accent whitespace-nowrap underline"
            >
              {siteConfig.contact.number}
            </a>
          </p>
        </div>
      )}
      {errors.root?.serverError && <FormError error={errors.root.serverError.message} />}
    </form>
  );
}
