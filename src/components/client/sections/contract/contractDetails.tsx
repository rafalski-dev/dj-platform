import { EventDetailRow } from "@/components/admin/sections/events/eventDetails/eventDetailRow";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import type { ContractDetails as ContractDetailsType } from "@/data/dashboard";
import { Link } from "@/i18n/navigation";
import { cn, toWarsawTime } from "@/lib/utils";
import type { Pathname } from "@/types/navigation";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { CalendarIcon, HeartIcon, Music2Icon, PencilIcon, UserIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

// "11.12.2026" – the same date format as Time and Place
const formatDate = (date: Date) => format(new TZDate(date, "Europe/Warsaw"), "dd.MM.yyyy");

// Read-only summary of what goes into the contract – each card links to the form that changes it
export async function ContractDetails({ details }: { details: ContractDetailsType }) {
  const [t, tEvents] = await Promise.all([
    getTranslations("Dashboard.Contract.details"),
    getTranslations("Admin.Events"),
  ]);
  const { client, wedding } = details;
  // a wedding without a ceremony (or another event type) – no ceremony card
  const ceremony = wedding?.weddingKind !== "None" ? wedding : null;

  const clientAddress = [client.streetAndNumber, [client.postcode, client.city].join(" ").trim()]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <DetailsCard
        title={t("client.title")}
        icon={<UserIcon />}
        editHref="/dashboard/account/details"
        editLabel={t("edit")}
        rows={[
          { label: t("client.name"), value: client.name },
          // a business signs with its tax id
          ...(client.clientType === "Business"
            ? [{ label: t("client.taxId"), value: client.taxId }]
            : []),
          { label: t("client.phone"), value: client.phone },
          { label: t("client.address"), value: clientAddress },
        ]}
      />

      <DetailsCard
        title={t("event.title")}
        icon={<CalendarIcon />}
        editHref="/dashboard/event/edit"
        editLabel={t("edit")}
        rows={[
          { label: t("event.date"), value: formatDate(details.date) },
          {
            label: t("event.hours"),
            value:
              details.startsAt &&
              details.endsAt &&
              `${toWarsawTime(details.startsAt)} – ${toWarsawTime(details.endsAt)}`,
          },
          { label: t("event.place"), value: details.place },
          { label: t("event.address"), value: details.address },
        ]}
      />

      {ceremony && (
        <DetailsCard
          title={t("ceremony.title")}
          icon={<HeartIcon />}
          editHref="/dashboard/event/edit"
          editLabel={t("edit")}
          rows={[
            {
              label: t("ceremony.date"),
              // no ceremony time yet – it's on the party day
              value: formatDate(ceremony.ceremonyStartsAt ?? details.date),
            },
            {
              label: t("ceremony.startTime"),
              value: ceremony.ceremonyStartsAt && toWarsawTime(ceremony.ceremonyStartsAt),
            },
            { label: t("ceremony.place"), value: ceremony.ceremonyPlace },
            { label: t("ceremony.address"), value: ceremony.ceremonyAddress },
          ]}
        />
      )}

      {/* only the DJ sets the package – no Edit */}
      <DetailsCard
        title={t("package.title")}
        icon={<Music2Icon />}
        rows={[
          {
            label: t("package.package"),
            value: details.package && tEvents(`Form.package.packages.${details.package}.title`),
          },
          {
            label: t("package.addons"),
            value:
              details.addons.length > 0
                ? details.addons.map((addon) => tEvents(`addons.${addon}`)).join(", ")
                : t("package.noAddons"),
          },
        ]}
      />
    </div>
  );
}

type DetailsCardProps = {
  title: string;
  icon: ReactNode;
  rows: { label: string; value: ReactNode }[];
  editHref?: Pathname;
  editLabel?: string;
};

function DetailsCard({ title, icon, rows, editHref, editLabel }: DetailsCardProps) {
  return (
    <Card size="md" className="gap-3">
      <CardHeader className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 text-[24px]">
          <span className="text-accent-foreground [&>svg]:size-5" aria-hidden="true">
            {icon}
          </span>
          {title}
        </h2>
        {editHref && (
          <Link
            href={editHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "xs" }),
              "text-accent-foreground",
            )}
          >
            <PencilIcon />
            {editLabel}
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <dl>
          {rows.map(({ label, value }) => (
            <EventDetailRow key={label} label={label}>
              {value}
            </EventDetailRow>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
