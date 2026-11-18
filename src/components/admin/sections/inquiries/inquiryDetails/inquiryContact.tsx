import { EventDetailRow } from "@/components/admin/sections/events/eventDetails/eventDetailRow";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { InquiryDetails } from "@/data/inquiries";
import { Link } from "@/i18n/navigation";
import { phoneNumberSplitting } from "@/lib/utils";
import { CalendarDaysIcon, ChevronRight, UserCheckIcon, UserPlusIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

const linkStyles = "text-accent-foreground hover:text-gold-light duration-200";

export async function InquiryContact({ fetchedData }: { fetchedData: InquiryDetails }) {
  const t = await getTranslations("Admin.Inquiries.Details.contact");
  const { email, phone, status, existingClient } = fetchedData;

  return (
    <Card size="md">
      <GeneralCardHeader title={t("title")} />
      <CardContent className="flex flex-col gap-4">
        <dl>
          <EventDetailRow label={t("email")}>
            <a href={`mailto:${email}`} className={linkStyles}>
              {email}
            </a>
          </EventDetailRow>
          <EventDetailRow label={t("phone")}>
            <a href={`tel:${phone}`} className={linkStyles}>
              {phoneNumberSplitting(phone)}
            </a>
          </EventDetailRow>
        </dl>

        {/* what "Accept" will do with the client */}
        {status === "New" && (
          <p className="text-muted-foreground flex gap-2 text-[13.5px]">
            {existingClient ? (
              <>
                <UserCheckIcon size={18} className="text-success shrink-0" />
                {t("existingClient", { name: existingClient.name })}
              </>
            ) : (
              <>
                <UserPlusIcon size={18} className="text-accent-foreground shrink-0" />
                {t("newClient")}
              </>
            )}
          </p>
        )}

        {existingClient && (
          <Link
            href={{
              pathname: "/admin/clients/[clientId]",
              params: { clientId: existingClient.id },
            }}
            className={buttonVariants({ variant: "outline", size: "sm", className: "w-full" })}
          >
            {t("openClient")}
            <ChevronRight className="size-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

// After accepting: where the event lives now, and that it still needs details
export async function InquiryEventCard({ event }: { event: NonNullable<InquiryDetails["event"]> }) {
  const t = await getTranslations("Admin.Inquiries.Details.event");

  return (
    <Card size="md">
      <GeneralCardHeader title={t("title")} />
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-3">
          <CalendarDaysIcon size={20} className="text-accent-foreground shrink-0" />
          <div className="flex min-w-0 flex-col gap-1">
            <p className="font-serif text-[20px]/tight wrap-anywhere">{event.name}</p>
            <p className="text-muted-foreground text-[13.5px]">{t("description")}</p>
          </div>
        </div>
        <Link
          href={{ pathname: "/admin/events/[eventId]", params: { eventId: event.id } }}
          className={buttonVariants({ size: "sm", className: "w-full" })}
        >
          {t("open")}
          <ChevronRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
