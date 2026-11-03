import { ClientListItem } from "@/components/admin/sections/clients/clientDetails/clientListItem";
import { EmptyState } from "@/components/admin/shared/emptyState";
import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { EventDetails } from "@/data/events";
import { ClockIcon, ListMusicIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

const emptyStateStyles = "pt-0 pb-3 md:pt-0 md:pb-3";
const listStyles = "flex flex-col gap-3";

export async function EventContractCard({
  fetchedData,
}: {
  fetchedData: EventDetails["contract"];
}) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Events.Details.contract");

  return (
    <Card size="md">
      <GeneralCardHeader
        title={t("title")}
        pathname={fetchedData ? undefined : "/admin/contracts/create"}
      />
      <CardContent>
        {fetchedData ? (
          <ul className={listStyles}>
            <ClientListItem
              pathname={{
                pathname: "/admin/contracts/[contractId]",
                params: { contractId: fetchedData.id },
              }}
              header={<>{fetchedData.contractNumber ?? `#${fetchedData.number}`}</>}
              footer={
                <>
                  <ClockIcon className="flex size-3" /> {t("created")}{" "}
                  {format.dateTime(fetchedData.createdAt, {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </>
              }
            />
          </ul>
        ) : (
          <EmptyState
            title={t("empty.title")}
            description={t("empty.description")}
            className={emptyStateStyles}
          />
        )}
      </CardContent>
    </Card>
  );
}

export async function EventPlaylistCard({
  fetchedData,
}: {
  fetchedData: EventDetails["playlist"];
}) {
  const t = await getTranslations("Admin.Events.Details.playlist");

  return (
    <Card size="md">
      <GeneralCardHeader
        title={t("title")}
        pathname={fetchedData ? undefined : "/admin/playlists/create"}
      />
      <CardContent>
        {fetchedData ? (
          <ul className={listStyles}>
            <ClientListItem
              pathname={{
                pathname: "/admin/playlists/[playlistId]",
                params: { playlistId: fetchedData.id },
              }}
              header={<>{fetchedData.name ?? t("title")}</>}
              footer={
                <>
                  <ListMusicIcon className="flex size-3" />{" "}
                  {t("songs", { count: fetchedData._count.songs })}
                </>
              }
            />
          </ul>
        ) : (
          <EmptyState
            title={t("empty.title")}
            description={t("empty.description")}
            className={emptyStateStyles}
          />
        )}
      </CardContent>
    </Card>
  );
}
