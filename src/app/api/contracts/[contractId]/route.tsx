import { adminCheck } from "@/lib/auth-helpers";
import { buildContractPdf } from "@/lib/contractPdf";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contractId: string }> },
) {
  const session = await adminCheck();

  const { contractId } = await params;

  try {
    const result = await buildContractPdf(contractId, session.user.id);

    if (result.error) {
      const errors = {
        notFound: "Contract not found.",
        noBusinessDetails: "Business details not found. Fill them in Settings first.",
        missingEventHours: "The event has no hours yet. Fill them in on the event first.",
      };
      const error = errors[result.error];
      return Response.json({ error }, { status: 404 });
    }

    return new Response(new Uint8Array(result.pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="contract.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
