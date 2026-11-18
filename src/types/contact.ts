import type { ContactSchema } from "@/validation/landing";

export type contactDataItemType = {
  nameKey: string;
  content: string;
  href: string;
};

export type ContactFormResult =
  | { success: true; status: "success"; message: string }
  | { success: false; status: "busy" | "rateLimited"; message: string }
  | {
      success: false;
      status: "invalid" | "error";
      message: string;
      errors?: Partial<Record<keyof ContactSchema, string[]>>;
    };

export type CheckDateResult =
  | { success: true; status: "free" }
  | { success: false; status: "busy" | "invalid" | "error" | "rateLimited"; message?: string };

export type ContactFormStep = "date" | "details" | "busy";
