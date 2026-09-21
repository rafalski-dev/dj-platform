import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
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
