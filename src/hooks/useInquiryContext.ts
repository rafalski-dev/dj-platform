import { InquiryContext } from "@/context/inquiryContext";
import { useContext } from "react";

export function useInquiryContext() {
  const inquiryContext = useContext(InquiryContext);
  if (!inquiryContext) throw new Error("Context is provided incorrectly");
  return inquiryContext;
}
