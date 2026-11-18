import "server-only";

import { RateLimitAction, rateLimits } from "@/constants/rateLimits";
import { db } from "@/lib/db";
import { headers } from "next/headers";

// x-real-ip is overwritten by the proxy (Vercel, or nginx on Hostinger with
// `proxy_set_header X-Real-IP $remote_addr;`), so the client can't fake it.
// The first x-forwarded-for value can be faked – fallback only.
async function getClientIp() {
  const headerList = await headers();

  return (
    headerList.get("x-real-ip") ??
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

type RateLimitResult = { allowed: true } | { allowed: false; retryAfterMinutes: number };

// Fixed window: max `limit` calls per `windowSeconds` for one action + IP (see constants/rateLimits).
// One atomic query (insert / reset / +1), so parallel calls can't both slip through.
export async function rateLimit(action: RateLimitAction): Promise<RateLimitResult> {
  const { limit, windowSeconds } = rateLimits[action];
  const key = `${action}:${await getClientIp()}`;

  try {
    const [row] = await db.$queryRaw<{ count: number; retryAfter: number }[]>`
      INSERT INTO "rate_limit" ("key", "count", "windowStart")
      VALUES (${key}, 1, now())
      ON CONFLICT ("key") DO UPDATE SET
        "count" = CASE
          WHEN "rate_limit"."windowStart" <= now() - make_interval(secs => ${windowSeconds}::int)
          THEN 1 ELSE "rate_limit"."count" + 1 END,
        "windowStart" = CASE
          WHEN "rate_limit"."windowStart" <= now() - make_interval(secs => ${windowSeconds}::int)
          THEN now() ELSE "rate_limit"."windowStart" END
      RETURNING
        "count",
        EXTRACT(EPOCH FROM ("windowStart" + make_interval(secs => ${windowSeconds}::int) - now()))::int
          AS "retryAfter"
    `;

    if (row.count <= limit) return { allowed: true };

    return { allowed: false, retryAfterMinutes: Math.max(1, Math.ceil(row.retryAfter / 60)) };
  } catch (err) {
    // A broken limiter must not block real clients – let the request through
    console.error("Rate limit check failed", err);
    return { allowed: true };
  }
}
