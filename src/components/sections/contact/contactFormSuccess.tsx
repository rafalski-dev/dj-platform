"use client";

import { SectionDescription } from "@/components/shared/sectionDescription";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export type ContactFormSuccessProps = {
  message: string | null;
  title: string;
  ref?: React.Ref<HTMLDivElement>;
  btnMessage: string;
  handleReset: () => void;
};

export function ContactFormSuccess({
  message,
  title,
  ref,
  handleReset,
  btnMessage,
}: ContactFormSuccessProps) {
  return (
    <div
      ref={ref}
      role="status"
      className="border-border/20 bg-card flex w-full flex-col items-center justify-center rounded-2xl border p-5 py-12 md:p-6 md:py-20 lg:w-1/2 lg:p-7 lg:py-10"
    >
      <span className="border-success-border bg-success-bg text-success-text mb-4 rounded-full border p-3.5 md:mb-5">
        <Check size={30} />
      </span>
      <p className="mb-2 text-center font-serif text-[33px]/11 md:mb-3 md:text-[38px]/12 lg:mb-4">
        {title}
      </p>
      <SectionDescription className="text-center text-[16px]">{message}</SectionDescription>
      <Button className="mt-5" onClick={handleReset}>
        {btnMessage}
      </Button>
    </div>
  );
}
