import { ClientDetails } from "@/components/dashboards/admin/clients/clientDetails/clientDetails";
import { ClientHeader } from "@/components/dashboards/admin/clients/clientDetails/clientHeader";
import {
  ContractInfoCard,
  EventsInfoCard,
  PlaylistsInfoCard,
} from "@/components/dashboards/admin/clients/clientDetails/clientInfoLists";
import { Breadcrumbs } from "@/components/dashboards/shared/breadcrumbs";
import { ClientListsSkeleton } from "@/components/dashboards/skeletons/clientListsSkeleton";
import {
  getClientContracts,
  getClientDetails,
  getClientEvents,
  getClientPlaylists,
} from "@/data/singleClient";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Client({
  params,
}: {
  params: Promise<{ locale: string; clientId: string }>;
}) {
  const { clientId } = await params;

  const client = await getClientDetails(clientId);
  if (!client) notFound();

  return (
    <>
      <Breadcrumbs dynamicLabel={client.name} />
      <ClientHeader fetchedData={client} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-start">
        <ClientDetails fetchedData={client} />
        <div className="flex flex-col gap-5">
          <Suspense fallback={<ClientListsSkeleton />}>
            <ClientLists clientId={clientId} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function ClientLists({ clientId }: { clientId: string }) {
  const [events, contracts, playlists] = await Promise.all([
    getClientEvents(clientId),
    getClientContracts(clientId),
    getClientPlaylists(clientId),
  ]);
  return (
    <>
      <EventsInfoCard fetchedData={events} />
      <ContractInfoCard fetchedData={contracts} />
      <PlaylistsInfoCard fetchedData={playlists} />
    </>
  );
}
