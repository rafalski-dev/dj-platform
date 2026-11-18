"use client";

import { CheckedDate, InquiryContext } from "@/context/inquiryContext";
import { useState } from "react";

// Connects the hero date check with the contact form further down the page
export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [checkedDate, setCheckedDate] = useState<CheckedDate | null>(null);

  return (
    <InquiryContext.Provider value={{ checkedDate, setCheckedDate }}>
      {children}
    </InquiryContext.Provider>
  );
}
