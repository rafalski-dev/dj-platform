import z from "zod";
import { CHATBOT_MESSAGE_MAX_LENGTH } from "@/constants/chatbot";
import { routing } from "@/i18n/routing";

// The route is public – never trust what the client sends
export const chatbotRequestSchema = z.object({
  locale: z.enum(routing.locales),
  messages: z
    .array(
      z.discriminatedUnion("role", [
        z.object({
          role: z.literal("user"),
          content: z.string().trim().min(1).max(CHATBOT_MESSAGE_MAX_LENGTH),
        }),
        // Claude's earlier answers – longer than user messages, but still capped
        z.object({ role: z.literal("assistant"), content: z.string().max(4000) }),
      ]),
    )
    .min(1),
});

export const isoDateSchema = z.iso.date();
