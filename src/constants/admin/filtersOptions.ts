import { FilterType } from "@/lib/searchParams";

export const filtersClientsData: { keyLabel: string; value: FilterType }[] = [
  { keyLabel: "all", value: undefined },
  { keyLabel: "active", value: "active" },
  { keyLabel: "past", value: "past" },
  { keyLabel: "no-event", value: "no-event" },
];
