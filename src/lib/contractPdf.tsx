import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "@/lib/db";
import { ContractTemplate } from "@/templates/contract/contractTemplate";

// Shared by the preview route and the send action, so both build the exact same PDF.
// Returns data (not a Response), so every caller decides how to report the error.
export async function buildContractPdf(contractId: string, userId: string) {
  const contract = await db.contract.findUnique({
    where: { id: contractId },
    select: {
      createdAt: true,
      event: {
        select: {
          type: true,
          altType: true,
          place: true,
          address: true,
          startsAt: true,
          endsAt: true,
          client: true,
        },
      },
    },
  });

  if (!contract) return { error: "notFound" as const };

  const performer = await db.businessDetails.findUnique({ where: { userId } });

  if (!performer) return { error: "noBusinessDetails" as const };

  const pdf = await renderToBuffer(
    <ContractTemplate
      signedAt={contract.createdAt}
      event={contract.event}
      client={contract.event.client}
      performer={performer}
    />,
  );

  return { pdf };
}
