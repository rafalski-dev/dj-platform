export async function POST(request: Request) {
  const { query } = await request.json();

  const response = await fetch(
    `https://api.deezer.com/search/track?q=${encodeURIComponent(query)}`,
  );
  const data = await response.json();

  return Response.json(data, { status: 200 });
}
