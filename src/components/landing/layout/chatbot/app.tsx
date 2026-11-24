"use client";

import { Button } from "@/components/ui/shadcn/button";
import { ArrowRight } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./chatbotButton";

const suggestedMessages = ["dates", "music", "area"] as const;

type ChatBotListProps = {
  messages: ChatMessage[];
  handleSubmit: (message: string) => void;
  handleBookDate: (isoDate: string) => void;
  isLoading: boolean;
};

export function ChatBotList({
  messages,
  handleSubmit,
  handleBookDate,
  isLoading,
}: ChatBotListProps) {
  const t = useTranslations("LandingPage.Chatbot");
  const format = useFormatter();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keep the newest message (or the "thinking" bubble) in view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="scroll-bar-edited mb-5 flex w-full flex-1 flex-col gap-3 overflow-y-auto pr-3">
      <div className="mt-auto flex flex-col gap-4">
        {messages.map((el) => {
          if (el.role === "user") {
            return (
              <div key={el.id} className="flex flex-col items-end gap-1.5">
                <span className="text-subtle-foreground text-xs font-semibold tracking-wide uppercase">
                  {t("userLabel")}
                </span>
                <p className="bg-primary/12 border-primary/30 text-foreground max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-relaxed whitespace-pre-line">
                  {el.content}
                </p>
              </div>
            );
          }

          return (
            <div key={el.id} className="flex flex-col items-start gap-1.5">
              <span className="text-primary text-xs font-semibold tracking-wide uppercase">
                {t("assistantLabel")}
              </span>
              <p className="bg-card text-muted-foreground max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-relaxed whitespace-pre-line">
                {el.content}
              </p>
              {el.freeDate && (
                <Button size="sm" onClick={() => handleBookDate(el.freeDate!)}>
                  {t("bookDate", {
                    date: format.dateTime(new Date(`${el.freeDate}T12:00`), { dateStyle: "long" }),
                  })}
                  <ArrowRight />
                </Button>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex flex-col items-start gap-1.5">
            <span className="text-primary text-xs font-semibold tracking-wide uppercase">
              {t("assistantLabel")}
            </span>
            <p className="bg-card text-subtle-foreground animate-pulse rounded-2xl border px-4 py-3 text-sm">
              {t("thinking")}
            </p>
          </div>
        )}
      </div>
      <div className="">
        {messages.length === 1 && (
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              {t("suggestedTitle")}
            </p>
            <ul className="flex flex-col gap-2">
              {suggestedMessages.map((key) => (
                <li key={key}>
                  <button
                    className="hover:bg-accent hover:border-border-strong w-full cursor-pointer rounded-lg border px-4 py-2.5 text-left text-sm transition-colors disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => handleSubmit(t(`suggested.${key}`))}
                    disabled={isLoading}
                  >
                    {t(`suggested.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
