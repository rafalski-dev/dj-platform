import { RowsPerPageType } from "@/components/dashboard/RowsPerPage";
import { db } from "@/lib/db";

export async function totalClients(rowsLimit: RowsPerPageType) {
  const limitToNumber = Number(rowsLimit);

  const clients = await db.client.findMany({ take: limitToNumber });

  return clients;
}
