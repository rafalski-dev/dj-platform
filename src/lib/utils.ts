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
  const second = splittedName[1][0] ?? "";
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

export function getValidPage(page: string | string[] | undefined, totalPages: number) {
  const pageToNumber = Number(page);

  if (!Number.isInteger(pageToNumber) || pageToNumber < 1) return 1;

  return Math.min(pageToNumber, totalPages);
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
