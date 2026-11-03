import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { EventDetails } from "@/data/events";
import { Link } from "@/i18n/navigation";
import { createInitials, phoneNumberSplitting } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { EventDetailRow } from "./eventDetailRow";

const linkStyles = "text-accent-foreground hover:text-gold-light duration-200";

type EventClientProps = {
  fetchedData: EventDetails["client"];
};

export async function EventClient({ fetchedData }: EventClientProps) {
  const t = await getTranslations("Admin.Events.Details.client");
  const tClients = await getTranslations("Admin.Clients");
  const { id, name, clientType, email, phone } = fetchedData;

  return (
    <Card size="md">
      <GeneralCardHeader title={t("title")} />
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>{createInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-serif text-[22px]/tight wrap-anywhere">{name}</p>
            <p className="text-muted-foreground text-[13px]">
              {tClients(`Form.clientType.options.${clientType}.title`)}
            </p>
          </div>
        </div>
        <dl>
          <EventDetailRow label={tClients("Details.info.fields.email")}>
            <a href={`mailto:${email}`} className={linkStyles}>
              {email}
            </a>
          </EventDetailRow>
          <EventDetailRow label={tClients("Details.info.fields.phone")}>
            {phone && (
              <a href={`tel:${phone}`} className={linkStyles}>
                {phoneNumberSplitting(phone)}
              </a>
            )}
          </EventDetailRow>
        </dl>
        <Link
          href={{ pathname: "/admin/clients/[clientId]", params: { clientId: id } }}
          className={buttonVariants({ variant: "outline", size: "sm", className: "w-full" })}
        >
          {t("open")}
          <ChevronRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
