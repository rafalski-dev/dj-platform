"use server";

import { eventDataFormatter } from "@/lib/actionHelpers";
import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { dateFormatter, formatZodErrors } from "@/lib/utils";
import { createEventSchema, CreateEventSchema } from "@/validation/events";
import { getTranslations } from "next-intl/server";

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
