import { Card, CardContent } from "@/components/ui/card";
import { GeneralCardHeader } from "@/components/dashboards/shared/generalCardHeader";
import { EmptyState } from "@/components/dashboards/shared/emptyState";
import { ClientListItem } from "./clientListItem";
import { getFormatter, getTranslations } from "next-intl/server";
import { ClockIcon, DotIcon } from "lucide-react";
import { getClientContracts, getClientEvents, getClientPlaylists } from "@/data/clients";

type EventsInfoCardProps = {
  fetchedData: Awaited<ReturnType<typeof getClientEvents>>;
};

const emptyStateStyles = "pt-0 pb-3 md:pt-0 md:pb-3";
const listStyles = "flex flex-col gap-3";

export async function EventsInfoCard({ fetchedData }: EventsInfoCardProps) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Clients.Details.events");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");

  return (
    <Card size="md" className="flex-1">
      <GeneralCardHeader
        title={t("title")}
        count={fetchedData.length}
        pathname={"/admin/events/create"}
      />
      <CardContent>
        {fetchedData.length === 0 ? (
          <EmptyState
            title={t("empty.title")}
            description={t("empty.description")}
            className={emptyStateStyles}
          />
        ) : (
          <ul className={listStyles}>
            {fetchedData.map((element) => {
              return (
                <ClientListItem
                  key={element.id}
                  pathname={{
                    pathname: "/admin/events/[eventId]",
                    params: { eventId: element.id },
                  }}
                  header={
                    <>
                      {tEventTypes(element.eventType)}
                      <DotIcon className="size-5" />{" "}
                      {format.dateTime(element.eventDate, {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </>
                  }
                  footer={
                    <>
                      <ClockIcon className="flex size-3" /> {t("lastUpdated")}{" "}
                      {format.dateTime(element.updatedAt, {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </>
                  }
                />
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

type ContractInfoCardProps = {
  fetchedData: Awaited<ReturnType<typeof getClientContracts>>;
};

export async function ContractInfoCard({ fetchedData }: ContractInfoCardProps) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Clients.Details.contracts");

  return (
    <Card size="md">
      <GeneralCardHeader
        title={t("title")}
        count={fetchedData.length}
        pathname={"/admin/contracts/create"}
      />
      <CardContent>
        {fetchedData.length === 0 ? (
          <EmptyState
            title={t("empty.title")}
            description={t("empty.description")}
            className={emptyStateStyles}
          />
        ) : (
          <ul className={listStyles}>
            {fetchedData.map((element) => {
              return (
                <ClientListItem
                  key={element.id}
                  pathname={{
                    pathname: "/admin/contracts/[contractId]",
                    params: { contractId: element.id },
                  }}
                  header={<>{element.contractNumber}</>}
                  footer={
                    <>
                      <ClockIcon className="flex size-3" /> {t("created")}{" "}
                      {format.dateTime(element.createdAt, {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </>
                  }
                />
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

type PlaylistsInfoCardProps = {
  fetchedData: Awaited<ReturnType<typeof getClientPlaylists>>;
};

export async function PlaylistsInfoCard({ fetchedData }: PlaylistsInfoCardProps) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Clients.Details.playlists");

  return (
    <Card size="md">
      <GeneralCardHeader
        title={t("title")}
        count={fetchedData.length}
        pathname={"/admin/playlists/create"}
      />
      <CardContent>
        {fetchedData.length === 0 ? (
          <EmptyState
            title={t("empty.title")}
            description={t("empty.description")}
            className={emptyStateStyles}
          />
        ) : (
          <ul className={listStyles}>
            {fetchedData.map((element) => {
              return (
                <ClientListItem
                  key={element.id}
                  pathname={{
                    pathname: "/admin/playlists/[playlistId]",
                    params: { playlistId: element.id },
                  }}
                  header={<>{element.name}</>}
                  footer={
                    <>
                      <ClockIcon className="flex size-3" /> {t("lastUpdated")}{" "}
                      {format.dateTime(element.updatedAt, {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </>
                  }
                />
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
