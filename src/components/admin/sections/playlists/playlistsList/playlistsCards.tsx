import { StatusBadge } from "@/components/admin/shared/statusBadge";
import { PlaylistItem } from "@/data/playlists";
import { Link } from "@/i18n/navigation";
import { ListMusicIcon, UserIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

type PlaylistsCardsProps = {
  playlists: PlaylistItem[];
  selectEmptyState: React.ReactNode;
};

export async function PlaylistsCards({ playlists, selectEmptyState }: PlaylistsCardsProps) {
  const t = await getTranslations("Admin.Playlists");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const format = await getFormatter();
  const iconSizes = 16;

  return (
    <ul className="flex flex-col gap-3 lg:hidden">
      {playlists.length === 0 ? (
        <li className="bg-card rounded-2xl border">{selectEmptyState}</li>
      ) : (
        playlists.map(({ id, _count, event }) => {
          return (
            <li key={id}>
              <Link
                href={{ pathname: "/admin/playlists/[playlistId]", params: { playlistId: id } }}
                className="bg-card border-border flex flex-col gap-3 rounded-2xl border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="border-border bg-accent-foreground/10 text-accent-foreground flex size-10 shrink-0 items-center justify-center rounded-lg border">
                      <ListMusicIcon size={iconSizes} />
                    </div>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-foreground truncate text-[15px] font-semibold">
                        {event.name}
                      </span>
                      <div className="text-subtle-foreground truncate text-[12.5px]">
                        {event.type === "Other" && event.altType
                          ? event.altType
                          : tEventTypes(event.type)}
                        <span aria-hidden="true"> · </span>
                        {format.dateTime(event.date, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          weekday: "short",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={event.status} />
                  </div>
                </div>
                <div className="border-border flex flex-col gap-1.5 border-t pt-3 text-[13px]">
                  <div className="flex min-w-0 items-center gap-2">
                    <UserIcon size={iconSizes} className="text-muted-foreground/50 shrink-0" />
                    <span className="text-muted-foreground truncate">{event.client.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ListMusicIcon size={iconSizes} className="text-muted-foreground/50 shrink-0" />
                    <span className="text-muted-foreground">
                      {t("list.songs", { count: _count.songs })}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })
      )}
    </ul>
  );
}
