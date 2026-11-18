"use client";

import { SectionDescription } from "@/components/landing/shared/sections/sectionDescription";
import { Button } from "@/components/ui/shadcn/button";
import { siteConfig } from "@/config/site";
import { CalendarX, PhoneIcon } from "lucide-react";

export type ContactFormBusyProps = {
  title: string;
  description: string;
  callBtnMessage: string;
  otherDateBtnMessage: string;
  handleOtherDate: () => void;
};

export function ContactFormBusy({
  title,
  description,
  callBtnMessage,
  otherDateBtnMessage,
  handleOtherDate,
}: ContactFormBusyProps) {
  return (
    <div
      role="status"
      className="border-border-strong bg-card flex w-full flex-col items-center justify-center rounded-2xl border p-5 py-12 md:p-6 md:py-20 lg:p-7 lg:py-10"
    >
      <span className="border-destructive/60 bg-destructive/3 text-destructive mb-4 rounded-full border p-3.5 md:mb-5">
        <CalendarX size={30} />
      </span>
      <p className="mb-2 text-center font-serif text-[33px]/11 md:mb-3 md:text-[38px]/12 lg:mb-4">
        {title}
      </p>
      <SectionDescription className="text-center text-[16px]">{description}</SectionDescription>
      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <Button nativeButton={false} render={<a href={`tel:${siteConfig.contact.number}`} />}>
          <PhoneIcon />
          {callBtnMessage}
        </Button>
        <Button variant="outline" onClick={handleOtherDate}>
          {otherDateBtnMessage}
        </Button>
      </div>
    </div>
  );
}
