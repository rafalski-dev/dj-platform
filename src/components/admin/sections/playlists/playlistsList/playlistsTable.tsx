import { ArrowRight, ListMusicIcon, UserIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/shadcn/table";
import { getFormatter, getTranslations } from "next-intl/server";
import { PlaylistsTableHeader } from "@/components/admin/sections/playlists/playlistsList/playlistsTableHeader";
import { StatusBadge } from "@/components/admin/shared/statusBadge";
import { buttonVariants } from "@/components/ui/shadcn/button";
import { PlaylistItem } from "@/data/playlists";
import { Link } from "@/i18n/navigation";

type PlaylistsTableProps = {
  playlists: PlaylistItem[];
  selectEmptyState: React.ReactNode;
};

export async function PlaylistsTable({ playlists, selectEmptyState }: PlaylistsTableProps) {
  const t = await getTranslations("Admin.Playlists");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const format = await getFormatter();
  const iconSizes = 16;

  return (
    <div className="hidden lg:block">
      <Table className="table-fixed">
        <PlaylistsTableHeader />
        <TableBody>
          {playlists.length === 0 ? (
            // results no exists
            <TableRow className="hover:bg-card">
              <TableCell colSpan={5} className="whitespace-normal">
                {selectEmptyState}
              </TableCell>
            </TableRow>
          ) : (
            // results exists
            playlists.map(({ id, name, _count, event }) => {
              const playlistName = name ?? t("list.untitled");
              return (
                <TableRow key={id} className="group">
                  <TableCell className="text-foreground">
                    <div className="flex flex-row items-center gap-3">
                      <div className="border-border bg-accent-foreground/10 text-accent-foreground flex size-9 shrink-0 items-center justify-center rounded-lg border">
                        <ListMusicIcon size={iconSizes} />
                      </div>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate text-sm">{playlistName}</span>
                        <span className="text-popover-foreground truncate text-xs">
                          {t("list.songs", { count: _count.songs })}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-foreground/80 truncate">
                      {event.type === "Other" && event.altType
                        ? event.altType
                        : tEventTypes(event.type)}
                    </div>
                    <div className="truncate">
                      {format.dateTime(event.date, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        weekday: "short",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserIcon size={iconSizes} className="text-muted-foreground/50 shrink-0" />
                      <span className="truncate">{event.client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <StatusBadge status={event.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={{
                        pathname: "/admin/playlists/[playlistId]",
                        params: { playlistId: id },
                      }}
                      className={buttonVariants({ variant: "secondary", size: "icon" })}
                      aria-label={t("list.details", { name: playlistName })}
                    >
                      <ArrowRight className="text-muted-foreground group-hover:text-accent-foreground size-5 transition-colors" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
