"use server";

import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { formatZodErrors } from "@/lib/utils";
import { noteSchema, NoteType } from "@/validation/notes";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

// Both pages that show notes – the client's Notes page and the admin event page
function revalidateNotes() {
  revalidatePath("/[locale]/dashboard/notes", "page");
  revalidatePath("/[locale]/admin/events/[eventId]", "page");
}

// Who may write on this event: the admin on any event, a client only on their own
async function canUseEvent(eventId: string, userId: string, isAdmin: boolean) {
  const event = await db.event.findFirst({
    where: { id: eventId, ...(!isAdmin && { client: { userId } }) },
    select: { id: true },
  });
  return !!event;
}

export async function createNoteAction(eventId: string, formData: NoteType) {
  const session = await getSession();
  const t = await getTranslations("Notes");
  if (!session)
    return { success: false, status: "invalidAuth", message: t("serverMessage.unknown") };

  const result = noteSchema(t).safeParse(formData);
  if (!result.success)
    return {
      success: false,
      status: "invalid",
      message: t("serverMessage.invalid"),
      errors: formatZodErrors(result.error),
    };

  try {
    const isAdmin = session.user.role === "Admin";
    if (!(await canUseEvent(eventId, session.user.id, isAdmin)))
      return { success: false, status: "notFound", message: t("serverMessage.notFound") };

    await db.note.create({
      data: {
        eventId,
        authorId: session.user.id,
        content: result.data.content,
      },
    });
    revalidateNotes();
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("serverMessage.unknown") };
  }

  return { success: true, status: "success", message: t("serverMessage.created") };
}

// Only the author changes their note – the other side can read it, not edit it
export async function updateNoteAction(noteId: string, formData: NoteType) {
  const session = await getSession();
  const t = await getTranslations("Notes");
  if (!session)
    return { success: false, status: "invalidAuth", message: t("serverMessage.unknown") };

  const result = noteSchema(t).safeParse(formData);
  if (!result.success)
    return {
      success: false,
      status: "invalid",
      message: t("serverMessage.invalid"),
      errors: formatZodErrors(result.error),
    };

  try {
    const { count } = await db.note.updateMany({
      where: { id: noteId, authorId: session.user.id },
      data: { content: result.data.content },
    });
    if (count === 0)
      return { success: false, status: "notFound", message: t("serverMessage.notFound") };

    revalidateNotes();
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("serverMessage.unknown") };
  }

  return { success: true, status: "success", message: t("serverMessage.updated") };
}

export async function deleteNoteAction(noteId: string) {
  const session = await getSession();
  const t = await getTranslations("Notes");
  if (!session)
    return { success: false, status: "invalidAuth", message: t("serverMessage.unknown") };

  try {
    const { count } = await db.note.deleteMany({
      where: { id: noteId, authorId: session.user.id },
    });
    if (count === 0)
      return { success: false, status: "notFound", message: t("serverMessage.notFound") };

    revalidateNotes();
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("serverMessage.unknown") };
  }

  return { success: true, status: "success", message: t("serverMessage.deleted") };
}
