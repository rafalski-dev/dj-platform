import type { ContactSchema } from "@/validation/contact";

export type contactDataItemType = {
  nameKey: string;
  content: string | undefined;
  href: string | undefined;
};

export type ContactFormResult =
  | { success: true; message: string }
  | { success: false; message: string; errors?: Partial<Record<keyof ContactSchema, string[]>> };
