import { FilterType, InquiryFilterType } from "@/lib/searchParams";

export const filtersInquiriesData: { keyLabel: string; value: InquiryFilterType }[] = [
  { keyLabel: "new", value: undefined },
  { keyLabel: "accepted", value: "accepted" },
  { keyLabel: "rejected", value: "rejected" },
  { keyLabel: "all", value: "all" },
];

export const filtersClientsData: { keyLabel: string; value: FilterType }[] = [
  { keyLabel: "all", value: undefined },
  { keyLabel: "active", value: "active" },
  { keyLabel: "past", value: "past" },
  { keyLabel: "no-event", value: "no-event" },
];
