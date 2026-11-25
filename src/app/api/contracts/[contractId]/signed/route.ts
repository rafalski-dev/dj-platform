import { adminCheck } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { r2 } from "@/lib/r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest } from "next/server";

// Admin: open the signed copy the client sent back (PDF or JPG) in a new tab
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contractId: string }> },
) {
  await adminCheck();

  const { contractId } = await params;

  try {
    const contract = await db.contract.findUnique({
      where: { id: contractId },
      select: { signedFileKey: true },
    });

    if (!contract?.signedFileKey)
      return Response.json({ error: "Signed contract not found." }, { status: 404 });

    // "inline" – the browser shows the PDF or the photo instead of downloading it
    const url = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: contract.signedFileKey,
        ResponseContentDisposition: "inline",
      }),
      { expiresIn: 300 },
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
