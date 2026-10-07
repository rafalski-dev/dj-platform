import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
