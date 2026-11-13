import { db } from "@/lib/db";
import { Prisma, SongMoment, SongType } from "../../generated";

type SeedSong = {
  artist: string | null;
  title: string;
  youtubeId?: string;
};

const mustPlaySongs: SeedSong[] = [
  { artist: "Boys", title: "Szalona", youtubeId: "c2i4h7Q-8sA" },
  { artist: "Queen", title: "Don't Stop Me Now", youtubeId: "HgzGwKwLmgM" },
  { artist: "ABBA", title: "Dancing Queen", youtubeId: "xFrGuyw1V8s" },
  { artist: "Bajm", title: "Biała armia" },
  { artist: "Bon Jovi", title: "Livin' on a Prayer", youtubeId: "lDK9QqIzhwk" },
  { artist: "Earth, Wind & Fire", title: "September", youtubeId: "Gs069dndIYk" },
  { artist: "Skolim", title: "Wyrwiemy się z miasta", youtubeId: "-6KuSa0zgaA" },
  { artist: "Whitney Houston", title: "I Wanna Dance with Somebody", youtubeId: "eH3giaIzONA" },
  { artist: "Lady Pank", title: "Zawsze tam, gdzie ty" },
  { artist: "Mark Ronson ft. Bruno Mars", title: "Uptown Funk", youtubeId: "OPf0YbXqDm0" },
  { artist: "Dua Lipa", title: "Levitating", youtubeId: "TUVcZfQe-Kw" },
  { artist: "Perfect", title: "Autobiografia" },
  { artist: "The Weeknd", title: "Blinding Lights", youtubeId: "4NRXx6U8ABQ" },
  { artist: "Avicii", title: "Wake Me Up", youtubeId: "IcrbM1l_BoI" },
  { artist: "Maryla Rodowicz", title: "Małgośka" },
  { artist: "Bee Gees", title: "Stayin' Alive", youtubeId: "fNFzfwLM72c" },
  { artist: "Kombii", title: "Pokolenie" },
  { artist: "Sanah", title: "Szampan" },
  { artist: "Dawid Podsiadło", title: "Małomiasteczkowy" },
  { artist: null, title: "Sto lat" },
];

const doNotPlaySongs: SeedSong[] = [
  { artist: "Los del Río", title: "Macarena", youtubeId: "zWaymcVmJ-A" },
  { artist: "Psy", title: "Gangnam Style", youtubeId: "9bZkp7q19f0" },
  { artist: "Shakira", title: "Waka Waka", youtubeId: "pRpeEdMmmQ0" },
  { artist: "Pinkfong", title: "Baby Shark Dance", youtubeId: "XqZsoesa55w" },
  { artist: "Las Ketchup", title: "The Ketchup Song" },
  { artist: "Akcent", title: "Przez twe oczy zielone" },
  { artist: "Bayer Full", title: "Majteczki w kropeczki" },
  { artist: "Crazy Frog", title: "Axel F" },
];

const highlightedSongs: Record<SongMoment, SeedSong[]> = {
  Welcoming: [
    { artist: "Coldplay", title: "Viva la Vida", youtubeId: "dvgZkm1xWPE" },
    { artist: "Kool & The Gang", title: "Celebration", youtubeId: "3GwjfUFyY6M" },
    { artist: "Mendelssohn", title: "Wedding March" },
  ],
  FirstDance: [
    { artist: "Ed Sheeran", title: "Perfect", youtubeId: "2Vv-BfVoq4g" },
    { artist: "John Legend", title: "All of Me", youtubeId: "450p7goxZqg" },
    { artist: "Elvis Presley", title: "Can't Help Falling in Love", youtubeId: "vGJTaP6anOU" },
  ],
  CakePresentation: [
    { artist: "Queen", title: "We Are the Champions", youtubeId: "04854XqcfCY" },
    { artist: "Survivor", title: "Eye of the Tiger", youtubeId: "btPJPFnesV4" },
    { artist: "Pharrell Williams", title: "Happy", youtubeId: "ZbZSe6N_BXs" },
  ],
  ParentsDedication: [
    { artist: "Louis Armstrong", title: "What a Wonderful World", youtubeId: "VqhCQZaH4Vs" },
    { artist: "Krzysztof Krawczyk", title: "Za tobą pójdę jak na bal" },
    { artist: "Anna Jantar", title: "Tyle słońca w całym mieście" },
  ],
};

function toSongCreate(
  song: SeedSong,
  type: SongType,
  playlistId: string,
  moment: SongMoment | null = null,
): Prisma.SongCreateManyInput {
  return {
    artist: song.artist,
    title: song.title,
    type,
    moment,
    playlistId,
    deezerId: null,
    youtubeURL: song.youtubeId ? `https://www.youtube.com/watch?v=${song.youtubeId}` : null,
    thumbnailURL: song.youtubeId ? `https://i.ytimg.com/vi/${song.youtubeId}/hqdefault.jpg` : null,
  };
}

// takes `count` songs starting at `offset`, wrapping around the list
function pickSongs(list: SeedSong[], offset: number, count: number) {
  return Array.from({ length: count }, (_, i) => list[(offset + i) % list.length]);
}

async function seedingSongsData() {
  if (!process.env.DATABASE_URL?.includes("localhost")) {
    throw new Error("Process can't be run on production");
  }

  const playlists = await db.playlist.findMany({
    select: { id: true, event: { select: { type: true } } },
    orderBy: { createdAt: "asc" },
  });

  const songsData: Prisma.SongCreateManyInput[] = playlists.flatMap((playlist, index) => {
    // every 4th playlist stays empty, so the empty state can be tested
    if (index % 4 === 3) return [];

    const mustPlay = pickSongs(mustPlaySongs, index * 3, 6).map((song) =>
      toSongCreate(song, SongType.MustPlay, playlist.id),
    );
    const doNotPlay = pickSongs(doNotPlaySongs, index * 2, 3).map((song) =>
      toSongCreate(song, SongType.DoNotPlay, playlist.id),
    );

    if (playlist.event.type !== "Wedding") return [...mustPlay, ...doNotPlay];

    const highlighted = Object.values(SongMoment).map((moment) => {
      const options = highlightedSongs[moment];
      return toSongCreate(
        options[index % options.length],
        SongType.HighlightedMoment,
        playlist.id,
        moment,
      );
    });

    return [...mustPlay, ...doNotPlay, ...highlighted];
  });

  await db.song.deleteMany();
  const { count } = await db.song.createMany({ data: songsData });

  console.log(`Created ${count} songs in ${playlists.length} playlists`);
}

seedingSongsData()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await db.$disconnect();
    process.exit(1);
  });
