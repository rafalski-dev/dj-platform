import { getSession } from "@/lib/auth-helpers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "You have no permission to make this request" }, { status: 401 });
  }
  const url = request.nextUrl.searchParams.get("url");

  if (!url || !url.includes("youtu")) {
    return Response.json({ error: "You must provide correct youtube url" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
      { signal: AbortSignal.timeout(5000) },
    );

    if (!response.ok) {
      return Response.json({ error: "Couldn't fetch Youtube URL data" }, { status: 502 });
    }

    const data = await response.json();

    const songData = {
      artist: data.title.includes(" - ") ? data.title.split(" - ")[0].trim() : null,
      title: data.title.includes(" - ") ? data.title.split(" - ")[1].trim() : data.title,
      youtubeURL: url,
      thumbnailURL: data.thumbnail_url.replace("/hqdefault.jpg", "/mqdefault.jpg"),
    };

    return Response.json(songData, { status: 200 });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return Response.json(
        { error: "YouTube is taking too long to respond. Try again in a moment." },
        { status: 504 },
      );
    }
    return Response.json({ error: "Something went wrong. Try again" }, { status: 500 });
  }
}
