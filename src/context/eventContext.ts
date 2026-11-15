import { Link } from "@/i18n/navigation";
import { ComponentProps, createContext, SetStateAction } from "react";

export type CreateEventContext = {
  currentStep: number;
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
  // Used by the edit form; the create form falls back to its defaults.
  cancelHref?: ComponentProps<typeof Link>["href"];
  submitLabel?: string;
};

export const CreateEventContext = createContext<CreateEventContext | null>(null);
