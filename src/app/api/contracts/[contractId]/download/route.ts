import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { r2 } from "@/lib/r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contractId: string }> },
) {
  const session = await getSession();
  if (!session) return Response.json({ error: "You have no permission" }, { status: 401 });

  const { contractId } = await params;

  if (!contractId)
    return Response.json({ error: "Contract id not found. Please try again" }, { status: 400 });

  try {
    // id from the URL + owner from the session – a client can't download someone else's contract
    const contract = await db.contract.findFirst({
      where: {
        id: contractId,
        status: { not: "Draft" },
        event: { client: { userId: session.user.id } },
      },
      select: { fileKey: true },
    });

    if (!contract?.fileKey) return Response.json({ error: "Contract not found." }, { status: 404 });

    // a short-lived link straight to the file in R2 – the browser downloads it from there
    const url = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: contract.fileKey,
        ResponseContentDisposition: 'attachment; filename="contract.pdf"',
      }),
      { expiresIn: 3600 },
    );

    return Response.redirect(url);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
