import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { ContractTemplate } from "@/templates/contract/contractTemplate";
import { renderToBuffer } from "@react-pdf/renderer";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contractId: string }> },
) {
  const session = await adminCheck();

  const { contractId } = await params;

  if (!contractId) {
    return Response.json({ message: "" }, { status: 400 });
  }

  try {
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

    if (!contract) {
      return Response.json(
        { error: "Contract data didn't find. Please try again" },
        { status: 404 },
      );
    }

    const performer = await db.businessDetails.findUnique({ where: { userId: session.user.id } });

    if (!performer) {
      return Response.json(
        { error: "Business details not found. Fill them in Settings first." },
        { status: 404 },
      );
    }

    const buffer = await renderToBuffer(
      <ContractTemplate
        signedAt={contract.createdAt}
        event={contract.event}
        client={contract.event.client}
        performer={performer}
      />,
    );

    return new Response(new Uint8Array(buffer), {
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
