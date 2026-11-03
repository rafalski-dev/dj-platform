import { Pathname } from "@/types/navigation";
import type { EventStatus } from "../../generated";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ZodError } from "zod";
import { TZDate } from "@date-fns/tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

export function createInitials(name: string) {
  const splittedName = name.trim().split(/\s+/);
  const first = splittedName[0][0] ?? "";
  const second = splittedName[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

export function phoneNumberSplitting(phoneNumber: string | null) {
  if (!phoneNumber) return;
  const first = phoneNumber.slice(0, 3);
  const second = phoneNumber.slice(3, 6);
  const third = phoneNumber.slice(6, 9);
  const rest = phoneNumber.slice(9);
  return `${first} ${second} ${third}${rest}`;
}

export type PaginationItem = number | "ellipsis-left" | "ellipsis-right";

export function getPaginationItems(page: number, totalPages: number): PaginationItem[] {
  // small amount of pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // near start: 1 2 3 4 5 … 10
  if (page <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-right", totalPages];
  }

  // near end: 1 … 6 7 8 9 10
  if (page >= totalPages - 3) {
    return [
      1,
      "ellipsis-left",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // center
  return [1, "ellipsis-left", page - 1, page, page + 1, "ellipsis-right", totalPages];
}

export function getErrorTranslation(error: { code?: string; status?: number } | null | undefined) {
  if (!error) {
    return "default";
  }

  if (error.status === 429) {
    return "tooManyRequests";
  }

  if (!error.code) {
    return "connection";
  }

  switch (error.code) {
    case "INVALID_TOKEN":
      return "invalidToken";
    case "INVALID_EMAIL_OR_PASSWORD":
      return "invalidEmailOrPass";
    case "EMAIL_NOT_VERIFIED":
      return "verifyEmail";
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "userAlreadyExists";
    case "FAILED_TO_CREATE_USER":
    case "FAILED_TO_CREATE_SESSION":
      return "failedToCreate";
    default:
      return "default";
  }
}

export function formatZodErrors(error: ZodError) {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path.join("."), issue.message] as const).reverse(),
  );
}

export function getStartOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today;
}

type EventStatusType = { date: Date; status: EventStatus };

export function getRelevantEvent<T extends EventStatusType>(events: T[]) {
  const avoidCancelled = events.filter((el) => el.status !== "Cancelled");
  const upcomingEvent = avoidCancelled.find((el) => el.date >= getStartOfToday());

  return upcomingEvent ?? avoidCancelled.at(-1) ?? events.at(-1);
}

export function isNavItemActive(pathname: string, navPath: Pathname) {
  return navPath === "/admin"
    ? pathname === navPath
    : pathname === navPath || pathname.startsWith(navPath);
}

export function formatDuration(startsAt: Date, endsAt: Date) {
  const totalMinutes = Math.round((endsAt.getTime() - startsAt.getTime()) / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes ? `${hours} h ${minutes} min` : `${hours} h`;
}

export function dateFormatter(date: Date, startTime?: string, endTime?: string) {
  const warsawDate = new TZDate(date, "Europe/Warsaw");
  const eventDate = new Date(
    Date.UTC(warsawDate.getFullYear(), warsawDate.getMonth(), warsawDate.getDate()),
  );
  const eventStartTime = new TZDate(date, "Europe/Warsaw");
  const eventEndTime = new TZDate(date, "Europe/Warsaw");

  if (startTime) {
    const [hours, minutes] = startTime.split(":").map((value) => Number(value));
    eventStartTime.setHours(hours, minutes, 0);
  }

  if (endTime) {
    const [hours, minutes] = endTime.split(":").map((value) => Number(value));
    eventEndTime.setHours(hours, minutes, 0);
  }

  if (eventStartTime > eventEndTime) eventEndTime.setDate(eventEndTime.getDate() + 1);

  return {
    eventDate,
    eventStartTime: new Date(eventStartTime.getTime()),
    eventEndTime: new Date(eventEndTime.getTime()),
  };
}
