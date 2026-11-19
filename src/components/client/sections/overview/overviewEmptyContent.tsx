"use client";

import { ContactForm } from "@/components/landing/sections/contact/contactForm";
import { Button } from "@/components/ui/shadcn/button";
import { toast } from "@/components/ui/shadcn/toast";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ContactSchema } from "@/validation/landing";
import { ChevronDownIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { OverviewCard } from "./overviewCard";

type OverviewEmptyContentProps = {
  initialContact: Pick<ContactSchema, "firstName" | "lastName" | "email">;
};

// The button opens the inquiry form right under the card – no separate page
export function OverviewEmptyContent({ initialContact }: OverviewEmptyContentProps) {
  const t = useTranslations("Dashboard.Overview.empty");
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { refresh } = useRouter();

  // The inquiry is saved – fresh server data swaps this card for the "awaiting confirmation"
  // one and puts the inquiry in the nav selector
  function onInquirySent(message: string) {
    toast.add({ type: "success", title: t("sentTitle"), description: message });
    refresh();
  }

  useEffect(() => {
    if (isOpen) formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [isOpen]);

  return (
    <>
      <OverviewCard
        label={t("label")}
        title={t("title")}
        aside={
          <Button
            aria-expanded={isOpen}
            aria-controls="overview-inquiry-form"
            onClick={() => setIsOpen((prev) => !prev)}
            className="shrink-0 gap-2 self-start sm:self-center"
          >
            {t("action")}
            <ChevronDownIcon
              className={cn("transition-transform duration-200", isOpen && "rotate-180")}
            />
          </Button>
        }
      >
        <p className="text-muted-foreground -mt-2 max-w-110 text-[15px] font-light">
          {t("description")}
        </p>
      </OverviewCard>

      {isOpen && (
        <div id="overview-inquiry-form" ref={formRef} className="scroll-mt-24">
          <ContactForm initialContact={initialContact} onSuccess={onInquirySent} />
        </div>
      )}
    </>
  );
}
