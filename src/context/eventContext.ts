import { createContext, SetStateAction } from "react";

export type CreateEventContext = {
  currentStep: number;
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
};

export const CreateEventContext = createContext<CreateEventContext | null>(null);
