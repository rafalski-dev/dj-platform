import { getSession } from "@/lib/auth-helpers";
import { NextRequest } from "next/server";

type DeezerTrack = {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_medium: string };
};

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "You have no permission to make request" }, { status: 401 });
  }

  const query = request.nextUrl.searchParams.get("query")?.trim();

  if (!query || query.length < 3 || query.length > 100) {
    return Response.json(
      { error: "Can't fetch suggestions from deezer. Query is too short or too long" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.deezer.com/search/track?q=${encodeURIComponent(query)}&limit=15`,
      { signal: AbortSignal.timeout(5000) },
    );

    if (!response.ok) {
      return Response.json(
        { error: "Deezer is unavailable right now. You can still add the song manually." },
        { status: 502 },
      );
    }

    const data = await response.json();

    if (data.error?.code === 4) {
      return Response.json(
        { error: "Too many searches. Wait a moment and try again." },
        { status: 429 },
      );
    }

    if (data.error) {
      return Response.json(
        { error: "Couldn’t load suggestions. You can still add the song manually." },
        { status: 502 },
      );
    }

    const formattedData = data.data.map((item: DeezerTrack) => ({
      id: item.id,
      artist: item.artist.name,
      title: item.title,
      preview: item.preview,
      coverURL: item.album.cover_medium,
    }));

    return Response.json(formattedData, { status: 200 });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return Response.json(
        { error: "Deezer is taking too long to respond. You can still add the song manually." },
        { status: 504 },
      );
    }
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
