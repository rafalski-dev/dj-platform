import { FilterType } from "@/lib/searchParams";

export const filtersClientsData: { keyLabel: string; filterOption: FilterType }[] = [
  { keyLabel: "all", filterOption: undefined },
  { keyLabel: "active", filterOption: "active" },
  { keyLabel: "past", filterOption: "past" },
  { keyLabel: "no-event", filterOption: "no-event" },
];
