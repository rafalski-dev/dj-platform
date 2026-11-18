import "server-only";

import { db } from "@/lib/db";

type AuthUser = { id: string; email: string; emailVerified: boolean; role?: string | null };

// Connects a client record (created by the DJ, e.g. from an accepted inquiry) with the account
// that has the same email. Only a VERIFIED email – otherwise anyone could sign up with
// someone else's address and see their event.
export async function linkClientAccount(user: AuthUser) {
  if (!user.emailVerified || user.role === "Admin") return;

  try {
    const alreadyLinked = await db.client.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });
    if (alreadyLinked) return;

    // updateMany: no error when there is no such client
    await db.client.updateMany({
      where: { email: user.email, userId: null },
      data: { userId: user.id },
    });
  } catch (error) {
    // Linking must never break signing in – it runs again on the next verification
    console.error("linkClientAccount:", error);
  }
}
