"use server";

import { SELECTED_EVENT_COOKIE } from "@/constants/dashboard";
import { getClientEventOptions, getOptionValue } from "@/data/dashboard";
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
