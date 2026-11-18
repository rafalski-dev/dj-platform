"use client";

import { useInquiryContext } from "@/hooks/useInquiryContext";
import { ContactForm } from "./contactForm";

// New key on every hero check → the form remounts at the details (free) or busy step
export function ContactFormContainer() {
  const { checkedDate } = useInquiryContext();

  return (
    <ContactForm
      key={checkedDate?.checkId ?? "initial"}
      initialDate={checkedDate?.date}
      initialStep={checkedDate ? (checkedDate.status === "free" ? "details" : "busy") : "date"}
    />
  );
}
