// Public landing actions – max calls per IP in one time window
export const rateLimits = {
  checkDate: { limit: 15, windowSeconds: 60 },
  inquiry: { limit: 5, windowSeconds: 60 * 60 },
  newsletter: { limit: 5, windowSeconds: 60 * 60 },
} as const;

export type RateLimitAction = keyof typeof rateLimits;
