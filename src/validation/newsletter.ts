import z from "zod";

export function createNewsletterSchema(emptyEmail: string, invalidEmail: string) {
  return z.object({
    email: z.string().nonempty({ error: emptyEmail }).email({ error: invalidEmail }),
  });
}
