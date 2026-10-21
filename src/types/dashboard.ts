import { getPaginatedClients } from "@/data/clients";
import { EventStatus } from "../../generated";

export type ClientStatus = EventStatus | "New";

type Client = Awaited<ReturnType<typeof getPaginatedClients>>[number];
type ClientEvent = Client["events"][number];
export type ClientWithEvent = Omit<Client, "events"> & { event: ClientEvent | undefined };
