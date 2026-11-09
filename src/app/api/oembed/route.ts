import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url || !url.includes("youtu")) {
    return Response.json({ error: "You must provide correct youtube url" }, { status: 400 });
  }

  try {
    const response =
      await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json
`);

    if (!response.ok) {
      return Response.json({ error: "Couldn't fetch Youtube URL data" }, { status: 404 });
    }

    const data = await response.json();
    console.log(data);
    const artist = data.title.split("-")[0].trim();
    const title = data.title.split("-")[1].trim();

    // hqdefault is 4:3 with black bars baked in; mqdefault is a clean 16:9 (320x180)
    const thumbnailURL = data.thumbnail_url.replace("/hqdefault.jpg", "/mqdefault.jpg");

    return Response.json({ youtubeURL: url, artist, title, thumbnailURL });
  } catch {
    return Response.json({ error: "Something went wrong. Try again" }, { status: 500 });
  }
}
