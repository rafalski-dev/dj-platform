import type { PlaylistDetails } from "@/data/playlists";
import { getFormatter, getTranslations } from "next-intl/server";
import { SongMoment, SongType } from "../../../../../../generated";

const momentLabels = [
  { moment: SongMoment.Welcoming, title: "Welcoming the couple" },
  { moment: SongMoment.FirstDance, title: "First dance" },
  { moment: SongMoment.CakePresentation, title: "Cake presentation" },
  { moment: SongMoment.ParentsDedication, title: "Dedication to parents" },
];

type Song = PlaylistDetails["songs"][number];

export async function PlaylistPrintView({ playlist }: { playlist: PlaylistDetails }) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Playlists.Details.songs");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const { event, songs } = playlist;

  const eventType =
    event.type === "Other" && event.altType ? event.altType : tEventTypes(event.type);
  const mustPlaySongs = songs.filter((song) => song.type === SongType.MustPlay);
  const doNotPlaySongs = songs.filter((song) => song.type === SongType.DoNotPlay);
  const highlightedSongs = songs.filter((song) => song.type === SongType.HighlightedMoment);

  return (
    <article className="bg-card print:text-background flex flex-col gap-5 rounded-xl border p-6 text-sm print:rounded-none print:border-0 print:bg-transparent print:p-0">
      <header className="flex flex-col gap-1.5 border-b pb-3 print:border-current">
        <p className="text-accent-foreground print:text-background text-xs font-semibold tracking-widest uppercase">
          Playlist · {eventType}
        </p>
        <h1 className="font-serif text-[26px]/none">{event.name}</h1>
        <p className="text-muted-foreground print:text-background text-xs">
          {format.dateTime(event.date, { dateStyle: "full" })} · {event.client.name}
        </p>
      </header>

      {event.type === "Wedding" && (
        <section className="flex break-inside-avoid flex-col gap-1.5">
          <h2 className="font-serif text-lg">Highlighted moments</h2>
          <dl className="flex flex-col">
            {momentLabels.map(({ moment, title }) => {
              const song = highlightedSongs.find((el) => el.moment === moment);

              return (
                <div
                  key={moment}
                  className="grid grid-cols-[160px_1fr] gap-3 border-b py-1 last:border-0 print:border-current/20"
                >
                  <dt className="text-muted-foreground print:text-background text-xs/5">{title}</dt>
                  <dd>{song ? <SongName song={song} /> : "—"}</dd>
                </div>
              );
            })}
          </dl>
        </section>
      )}

      <SongsSection title={t("mustPlay")} songs={mustPlaySongs} />
      <SongsSection title={t("doNotPlay")} songs={doNotPlaySongs} />
    </article>
  );
}

function SongsSection({ title, songs }: { title: string; songs: Song[] }) {
  return (
    <section className="flex flex-col gap-1.5">
      <h2 className="font-serif text-lg">
        {title}{" "}
        <span className="text-muted-foreground print:text-background text-sm">
          ({songs.length})
        </span>
      </h2>
      {songs.length === 0 ? (
        <p className="text-muted-foreground print:text-background text-xs">No songs</p>
      ) : (
        <ol className="flex list-decimal flex-col pl-5">
          {songs.map((song) => (
            <li
              key={song.id}
              className="marker:text-muted-foreground print:marker:text-background break-inside-avoid border-b py-1 last:border-0 print:border-current/20"
            >
              <SongName song={song} />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function SongName({ song }: { song: Song }) {
  return (
    <span>
      <span className="font-semibold">{song.artist ?? "Unknown artist"}</span> – {song.title}
    </span>
  );
}
