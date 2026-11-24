import Anthropic from "@anthropic-ai/sdk";
import { isDateAvailable } from "@/data/events";
import { siteConfig } from "@/config/site";
import { CHATBOT_HISTORY_LIMIT } from "@/constants/chatbot";
import { anthropic } from "@/lib/anthropic";
import { rateLimit } from "@/lib/rateLimit";
import { chatbotRequestSchema, isoDateSchema } from "@/validation/chatbot";
import { getTranslations } from "next-intl/server";
import { NextRequest } from "next/server";

const checkAvailabilityTool: Anthropic.Tool = {
  name: "check_availability",
  description:
    "Checks if DJ MAVEN is free on a given date. Use it whenever the user asks about a specific date.",
  input_schema: {
    type: "object",
    properties: {
      date: { type: "string", description: "The event date in YYYY-MM-DD format" },
    },
    required: ["date"],
  },
};

const initialArray = [
  "availability",
  "travel",
  "music",
  "songs",
  "ceremony",
  "equipment",
  "booking",
];

// "sv-SE" formats as YYYY-MM-DD – today in Poland, not in UTC
function getTodayInWarsaw() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(new Date());
}

async function checkAvailability(date: string, today: string) {
  if (!isoDateSchema.safeParse(date).success) return "invalid date";
  if (date < today) return "past";

  return (await isDateAvailable(new Date(date))) ? "free" : "busy";
}

export async function POST(request: NextRequest) {
  const result = chatbotRequestSchema.safeParse(await request.json().catch(() => null));

  if (!result.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { locale } = result.data;

  // Before anything else – every message costs money, so bots count too
  const limit = await rateLimit("chatbot");
  if (!limit.allowed) {
    const tChatbot = await getTranslations({ locale, namespace: "LandingPage.Chatbot" });
    return Response.json(
      {
        error: tChatbot("tooManyRequests", {
          minutes: limit.retryAfterMinutes,
          phone: siteConfig.contact.number,
        }),
      },
      { status: 429 },
    );
  }

  // Only the latest messages go to Claude, and the conversation must start with the user
  const messages = result.data.messages.slice(-CHATBOT_HISTORY_LIMIT);
  while (messages[0]?.role === "assistant") messages.shift();

  const t = await getTranslations({ locale, namespace: "LandingPage.FAQ.items" });

  const faqText = initialArray
    .map((el) => ["Question:", t(`${el}.question`), "Answer:", t(`${el}.answer`)].join(" "))
    .join(" ");

  const today = getTodayInWarsaw();

  const system = `You are the AI assistant on the website of DJ MAVEN, a wedding and event DJ from Poland.
      Your job is to answer visitors' questions about DJ MAVEN's services.
      Today is ${today}.

      <faq>
      ${faqText}
      </faq>

      Rules:
      - Answer only using the information in <faq>. Don't invent prices, dates or services.
      - If the answer isn't in <faq>, say you don't know and suggest the contact form on this page or phone number ${siteConfig.contact.number}.
      - Reply in the same language the user writes in (Polish or English).
      - Keep answers short: 2–4 sentences, friendly and natural.
      - Talk about DJ MAVEN in the third person.
      - If the user asks about a specific date, use the check_availability tool.
      - If the user asks about availability without a specific date, ask them which date they have in mind.
      - If the date is busy, say so politely and invite them to ask about another date or use the contact form.
      - If the date is free, say so and mention they can book it with the button below your message.
      - If the date is in the past, say that politely and ask for a future date.
`;

  try {
    // Shared by both calls – the second one must see the same system prompt and tools
    const params = {
      model: "claude-haiku-5-5",
      max_tokens: 500,
      system: system,
      tools: [checkAvailabilityTool],
    };

    // 1st call: Claude answers right away, or asks us to run the tool
    const response = await anthropic.messages.create({ ...params, messages: messages });

    if (response.stop_reason !== "tool_use") {
      return Response.json({ text: getText(response) });
    }

    // Claude wants a date checked
    const toolUse = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
    );

    if (!toolUse) {
      return Response.json({ error: "Something went wrong!" }, { status: 500 });
    }

    const { date } = toolUse.input as { date: string };
    const availability = await checkAvailability(date, today);

    // 2nd call: the same conversation + Claude's tool request + our result
    const finalResponse = await anthropic.messages.create({
      ...params,
      messages: [
        ...messages,
        { role: "assistant", content: response.content },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: toolUse.id, content: availability }],
        },
      ],
    });

    // freeDate lets the chat show a "Book this date" button
    return Response.json({
      text: getText(finalResponse),
      freeDate: availability === "free" ? date : undefined,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Something went wrong!" }, { status: 500 });
  }
}

function getText(message: Anthropic.Message) {
  return message.content.find((block): block is Anthropic.TextBlock => block.type === "text")?.text;
}
