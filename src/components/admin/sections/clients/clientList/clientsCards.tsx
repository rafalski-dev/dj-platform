import { StatusBadge } from "@/components/admin/shared/statusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { Link } from "@/i18n/navigation";
import { createInitials, phoneNumberSplitting } from "@/lib/utils";
import { ClientWithEvent } from "@/types/dashboard";
import { MailIcon, PhoneIcon, PlusIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

type ClientsCardsProps = {
  clients: ClientWithEvent[];
  selectEmptyState: React.ReactNode;
};

export async function ClientsCards({ clients, selectEmptyState }: ClientsCardsProps) {
  const t = await getTranslations("Admin.Clients");
  const format = await getFormatter();
  const iconSizes = 16;

  return (
    <ul className="flex flex-col gap-3 lg:hidden">
      {clients.length === 0 ? (
        <li className="bg-card rounded-2xl border">{selectEmptyState}</li>
      ) : (
        clients.map(({ id, name, email, phone, event }) => {
          const formattedPhoneNumber = phoneNumberSplitting(phone);
          return (
            <li key={id}>
              <Link
                href={{ pathname: "/admin/clients/[clientId]", params: { clientId: id } }}
                className="bg-card border-border flex flex-col gap-3 rounded-2xl border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarFallback>{createInitials(name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-foreground truncate text-[15px] font-semibold">
                        {name}
                      </span>
                      <div className="text-subtle-foreground truncate text-[12.5px]">
                        {event ? (
                          <>
                            {t(`list.eventTypes.${event.eventType}`)}
                            <span aria-hidden="true"> · </span>
                            {format.dateTime(event.eventDate, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              weekday: "short",
                            })}
                          </>
                        ) : (
                          <span className="text-popover-foreground">{t("list.noEvent")}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {event ? (
                      <StatusBadge status={event.eventStatus} />
                    ) : (
                      <StatusBadge status="New" />
                    )}
                  </div>
                </div>
                <div className="border-border flex flex-col gap-1.5 border-t pt-3 text-[13px]">
                  {email ? (
                    <div className="flex min-w-0 items-center gap-2">
                      <MailIcon size={iconSizes} className="text-muted-foreground/50 shrink-0" />
                      <span className="text-muted-foreground truncate">{email}</span>
                    </div>
                  ) : (
                    <div className="text-popover-foreground flex items-center gap-2 italic">
                      <PlusIcon size={iconSizes} className="shrink-0" />
                      <span>{t("list.addEmail")}</span>
                    </div>
                  )}
                  {formattedPhoneNumber ? (
                    <div className="flex items-center gap-2">
                      <PhoneIcon size={iconSizes} className="text-muted-foreground/50 shrink-0" />
                      <span className="text-muted-foreground">{formattedPhoneNumber}</span>
                    </div>
                  ) : (
                    <div className="text-popover-foreground flex items-center gap-2 italic">
                      <PlusIcon size={iconSizes} className="shrink-0" />
                      <span>{t("list.addPhone")}</span>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          );
        })
      )}
    </ul>
  );
}
