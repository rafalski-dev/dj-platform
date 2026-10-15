import { Prisma } from "../../generated";

/**
 * Database errors the user can act on, plus "unknown" for everything else.
 * - duplicate: a unique field is already taken (e.g. email, Tax ID) – P2002
 * - notFound:  the record no longer exists (update/delete/findUniqueOrThrow) – P2025
 * - inUse:     the record is still referenced by another one (e.g. client with events) – P2003
 * - unknown:   anything else (connection problems, bugs) – log it on the server
 */
export type DbErrorKind = "duplicate" | "notFound" | "inUse" | "unknown";

export function getDbErrorKind(error: unknown): DbErrorKind {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return "duplicate";
      case "P2025":
        return "notFound";
      case "P2003":
        return "inUse";
    }
  }

  return "unknown";
}
