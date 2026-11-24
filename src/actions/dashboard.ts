"use server";

import { SELECTED_EVENT_COOKIE } from "@/constants/dashboard";
import { getClientEventOptions, getOptionValue } from "@/data/dashboard";
import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { dateFormatter, formatZodErrors } from "@/lib/utils";
import {
  eventDetailsSchema,
  EventDetailsType,
  myDetailsSchema,
  MyDetailsType,
} from "@/validation/dashboard";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

// Setting a cookie in an action re-renders the current page → it shows the new event
export async function selectEventAction(value: string) {
  const options = await getClientEventOptions();
  const isOwnOption = options.some((option) => getOptionValue(option) === value);

  if (!isOwnOption) return { success: false, status: "notFound" };

  (await cookies()).set(SELECTED_EVENT_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return { success: true, status: "success" };
}

// The client edits only their own record – found by the logged-in user, never by an id from the form
export async function myDetailsAction(formData: MyDetailsType) {
  const session = await getSession();
  const t = await getTranslations("Dashboard.Account");
  if (!session) return { success: false, status: "invalidAuth", message: t("details.error") };

  const schema = myDetailsSchema(t);
  const result = schema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      status: "invalid",
      message: t("details.invalid"),
      errors: formatZodErrors(result.error),
    };
  }

  try {
    const client = await db.client.findUnique({
      where: { userId: session.user.id },
      select: { clientType: true },
    });
    if (!client) return { success: false, status: "notFound", message: t("details.error") };
    const details = result.data;

    // Same as clientDataFormatter: a private client's name is their full name,
    // a business keeps its business name
    const data = {
      ...details,
      ...(client.clientType === "Individual" && {
        name: `${details.firstName} ${details.lastName}`,
      }),
      phone: details.phone || null,
      region: details.region || null,
      country: details.country || null,
    };

    await db.client.update({ where: { userId: session.user.id }, data });

    return { success: true, status: "success", message: t("details.saved") };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("details.error") };
  }
}

// The id comes from the form, so the event is checked against the logged-in user first
export async function eventDetailsAction(eventId: string, formData: EventDetailsType) {
  const session = await getSession();
  const t = await getTranslations("Dashboard.EventEdit");
  if (!session) return { success: false, status: "invalidAuth", message: t("error") };

  const result = eventDetailsSchema(t).safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      status: "invalid",
      message: t("invalid"),
      errors: formatZodErrors(result.error),
    };
  }

  try {
    const event = await db.event.findFirst({
      where: { id: eventId, client: { userId: session.user.id } },
      select: { date: true },
    });
    if (!event) return { success: false, status: "notFound", message: t("error") };

    // same as the admin form – an end before the start means the party goes past midnight
    const { eventStartTime, eventEndTime } = dateFormatter(
      event.date,
      result.data.startTime,
      result.data.endTime,
    );

    await db.event.update({
      where: { id: eventId },
      data: { startsAt: eventStartTime, endsAt: eventEndTime, address: result.data.address },
    });

    return { success: true, status: "success", message: t("saved") };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: t("error") };
  }
}
