import type { useTranslations } from "next-intl";
import z from "zod";

type NotesTranslator = ReturnType<typeof useTranslations<"Notes">>;

export function noteSchema(t: NotesTranslator) {
  return z.object({
    content: z
      .string()
      .trim()
      .min(1, { error: t("fields.content.required") })
      .max(2000, { error: t("fields.content.tooLong") }),
  });
}

export type NoteType = z.infer<ReturnType<typeof noteSchema>>;
