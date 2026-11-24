"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/shadcn/button";
import { CONTACT_FORM_ID } from "@/constants/contact";
import { useInquiryContext } from "@/hooks/useInquiryContext";
import { cn } from "@/lib/utils";
import { BotIcon, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ChatBotInput } from "./chatbotInput";
import { ChatBotList } from "./app";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  freeDate?: string;
};

const MOBILE_QUERY = "(max-width: 767px)";

export function Chatbot() {
  const locale = useLocale();
  const t = useTranslations("LandingPage.Chatbot");
  const { setCheckedDate } = useInquiryContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // The welcome message is UI only – slice(1) below keeps it out of the API request
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: "welcome", role: "assistant", content: t("welcome") },
  ]);

  useEffect(() => {
    if (!isOpen) return;
    const lockScroll = window.matchMedia(MOBILE_QUERY).matches;
    if (lockScroll) document.body.style.overflow = "hidden";

    function closePopup(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", closePopup);

    return () => {
      if (lockScroll) document.body.style.overflow = "";
      window.removeEventListener("keydown", closePopup);
    };
  }, [isOpen]);

  async function handleSubmit(userMessage: string) {
    if (isLoading) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: userMessage },
    ]);
    setIsLoading(true);

    const mapped = messages.map(({ role, content }) => ({ role, content })).slice(1);

    const newMessages = [...mapped, { role: "user", content: userMessage }];

    let answer: string;
    let freeDate: string | undefined;

    try {
      const response = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ messages: newMessages, locale }),
      });

      const data = await response.json();

      // A success is { text, freeDate? }, 400 / 429 / 500 come back as { error }
      answer = (response.ok ? data.text : data.error) ?? t("error");
      freeDate = response.ok ? data.freeDate : undefined;
    } catch {
      // No connection, or the response wasn't JSON
      answer = t("error");
    }

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "assistant", content: answer, freeDate },
    ]);
    setIsLoading(false);
  }

  // Same flow as the hero date check: the contact form opens on the details step with this date
  function handleBookDate(isoDate: string) {
    const [year, month, day] = isoDate.split("-").map(Number);

    setCheckedDate((prev) => ({
      date: new Date(year, month - 1, day),
      status: "free",
      checkId: (prev?.checkId ?? 0) + 1,
    }));
    setIsOpen(false);

    // Wait a frame, so the mobile scroll lock is released before scrolling
    requestAnimationFrame(() => {
      document.getElementById(CONTACT_FORM_ID)?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <>
      {isOpen && (
        <div className="bg-background fixed inset-0 z-50 flex max-h-dvh flex-col px-5 py-4 md:inset-auto md:right-5 md:bottom-18 md:h-150 md:max-h-[calc(100dvh-6rem)] md:w-100 md:rounded-2xl md:border md:shadow-2xl">
          <div className="border-border mb-3 flex items-center justify-between border-b pb-3">
            <span className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
              {t("title")}
            </span>
            <Button
              size="icon-lg"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="text-accent-foreground"
              aria-label={t("close")}
            >
              <ChevronDownIcon />
            </Button>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <ChatBotList
              messages={messages}
              handleSubmit={handleSubmit}
              handleBookDate={handleBookDate}
              isLoading={isLoading}
            />
            <ChatBotInput handleSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      )}
      {/* On desktop the button stays under the panel and toggles it; on mobile the full-screen chat covers it */}
      <div className={cn("fixed right-5 bottom-4 z-50", isOpen && "max-md:hidden")}>
        <Button onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen}>
          {isOpen ? (
            <>
              {t("hideButton")} <ChevronDownIcon className="size-5" />
            </>
          ) : (
            <>
              {t("openButton")} <BotIcon className="size-6" strokeWidth={1.7} />
            </>
          )}
        </Button>
      </div>
    </>
  );
}
