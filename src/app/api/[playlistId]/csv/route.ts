import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ playlistId: string }> },
) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "You have no permission to run this call." }, { status: 401 });
  }
  const { playlistId } = await params;

  try {
    if (session.user.role !== "Admin") {
      const playlist = await db.playlist.findFirst({
        where: { id: playlistId, event: { client: { userId: session.user.id } } },
      });

      if (!playlist)
        return Response.json(
          { error: "You have no permission to run this call." },
          { status: 403 },
        );
    }

    const songs = await db.song.findMany({
      select: { artist: true, title: true, type: true, moment: true },
      where: { playlistId },
    });
    const csv = songs
      .map((el) => {
        return `"${el.artist ?? ""}","${el.title}","${el.type}","${el.moment ?? ""}"\n`;
      })
      .join("");

    const formatedCSV = `ARTIST,TITLE,TYPE,MOMENT\n${csv}`;

    return new Response(formatedCSV, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="playlist.csv"',
      },
    });
  } catch {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
