"use server";

import { eventDataFormatter } from "@/lib/actionHelpers";
import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getDbErrorKind } from "@/lib/prismaErrors";
import { dateFormatter, formatZodErrors } from "@/lib/utils";
import { createEventSchema, CreateEventSchema } from "@/validation/events";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function createEventAction(formData: CreateEventSchema, allowSameDay: boolean) {
  await adminCheck();
  const t = await getTranslations("Admin.Events.Form");
  const schema = createEventSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success)
    return {
      success: false,
      status: "invalid",
      message: t("serverMessage.invalid"),
      errors: formatZodErrors(result?.error),
    };

  if (!allowSameDay) {
    const { eventDate } = dateFormatter(result.data.dateAndPlace.eventDate);

    const existingEvent = await db.event.findFirst({
      where: { date: eventDate, status: { not: "Cancelled" } },
    });

    if (existingEvent)
      return {
        success: false,
        status: "conflict",
        message: t("conflict.description"),
      };
  }

  try {
    await db.event.create({ data: eventDataFormatter(result.data) });
  } catch (err) {
    console.error(err);
    return { success: false, status: "error", message: t("serverMessage.unknown") };
  }

  return {
    success: true,
    status: "success",
    message: t("serverMessage.success"),
  };
}

export async function deleteEventAction(eventId: string) {
  await adminCheck();
  const t = await getTranslations("Admin.Events.Details.delete.serverMessage");

  let eventName: string;

  try {
    const event = await db.event.delete({ where: { id: eventId } });
    eventName = event.name;
  } catch (error) {
    console.error(error);
    const kind = getDbErrorKind(error);
    return { status: "error", success: false, message: t(kind === "duplicate" ? "unknown" : kind) };
  }

  return { status: "success", success: true, message: t("success", { name: eventName }) };
}

export async function editEventAction(
  formData: CreateEventSchema,
  eventId: string,
  allowSameDay: boolean,
) {
  await adminCheck();
  const t = await getTranslations("Admin.Events.Form");
  const tEdit = await getTranslations("Admin.Events.Edit");
  const schema = createEventSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success)
    return {
      success: false,
      status: "invalid",
      message: t("serverMessage.invalid"),
      errors: formatZodErrors(result?.error),
    };

  if (!allowSameDay) {
    const { eventDate } = dateFormatter(result.data.dateAndPlace.eventDate);

    // Same check as when creating, but this event doesn't count as a conflict with itself.
    const existingEvent = await db.event.findFirst({
      where: { date: eventDate, status: { not: "Cancelled" }, id: { not: eventId } },
    });

    if (existingEvent)
      return {
        success: false,
        status: "conflict",
        message: t("conflict.description"),
      };
  }

  // Reuse the create formatter, but keep the current status and don't create a new playlist.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { status, playlist, ...formatted } = eventDataFormatter(result.data);
  const { wedding, ...eventData } =
    "wedding" in formatted ? formatted : { ...formatted, wedding: undefined };
  const weddingData = wedding?.create;

  try {
    const event = await db.$transaction(async (tx) => {
      // An event that's no longer a wedding shouldn't keep its wedding details.
      if (!weddingData) await tx.weddingDetails.deleteMany({ where: { eventId } });

      return tx.event.update({
        where: { id: eventId },
        data: {
          ...eventData,
          ...(weddingData && {
            wedding: { upsert: { create: weddingData, update: weddingData } },
          }),
        },
      });
    });

    revalidatePath("/[locale]/admin/events/[eventId]", "page");

    return {
      success: true,
      status: "success",
      message: tEdit("success", { name: event.name }),
    };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("serverMessage.unknown") };
  }
}
