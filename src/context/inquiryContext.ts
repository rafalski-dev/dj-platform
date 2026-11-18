import { createContext, SetStateAction } from "react";

// A date checked in the hero; checkId grows on every check, so the contact form can remount
export type CheckedDate = { date: Date; status: "free" | "busy"; checkId: number };

export type InquiryContext = {
  checkedDate: CheckedDate | null;
  setCheckedDate: React.Dispatch<SetStateAction<CheckedDate | null>>;
};

export const InquiryContext = createContext<InquiryContext | null>(null);
