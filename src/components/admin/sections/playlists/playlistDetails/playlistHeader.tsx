import { EventDateTile } from "@/components/admin/shared/eventDateTile";
import { StatusBadge } from "@/components/admin/shared/statusBadge";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button, buttonVariants } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card";
import type { PlaylistDetails } from "@/data/playlists";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  PrinterIcon,
  UserIcon,
  ListVideoIcon,
} from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { SongType } from "../../../../../../generated";
import { Link } from "@/i18n/navigation";
import { DownloadCSVItem } from "./downloadCSVItem";
import { TogglePlaylist } from "./togglePlaylist";

export async function PlaylistHeader({
  fetchedData,
  isAdmin,
}: {
  fetchedData: PlaylistDetails;
  isAdmin: boolean;
}) {
  const format = await getFormatter();
  const t = await getTranslations("Admin.Playlists");
  const tEventTypes = await getTranslations("Admin.Clients.list.eventTypes");
  const { id, createdAt, updatedAt, songs, event, status } = fetchedData;
  const isLocked = status === "Locked";

  const eventType =
    event.type === "Other" && event.altType ? event.altType : tEventTypes(event.type);

  const availableYoutubeSongs = songs
    .filter((el) => el.youtubeURL !== null && el.type !== SongType.DoNotPlay)
    .map((el) => {
      if (!el.youtubeURL) return;
      if (el.youtubeURL.includes("youtu.be")) {
        return new URL(el.youtubeURL).pathname.slice(1);
      }
      return new URL(el.youtubeURL).searchParams.get("v");
    });

  const playlistInfo = [
    { icon: <CalendarIcon size={15} />, label: t("Details.header.created"), content: createdAt },
    { icon: <ClockIcon size={15} />, label: t("Details.header.lastEdited"), content: updatedAt },
  ];

  return (
    <Card size="md">
      <div className="flex min-w-0 flex-col gap-5">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-2">
            <HeaderLabel label={eventType} date={event.date} />
            <h1 className="font-serif text-[30px]/none wrap-break-word lining-nums lg:text-[34px]/none">
              {event.name}
            </h1>
            <div className="flex flex-row flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-muted-foreground border-border-strong">
                {t("list.songs", { count: songs.length })}
              </Badge>
            </div>
          </div>
          <EventDateTile date={event.date} className="hidden sm:flex" />
        </CardHeader>
        <CardContent>
          <dl className="flex flex-row flex-wrap justify-start gap-x-4 gap-y-2">
            {/* the client knows who they are – the name is only for the DJ */}
            {isAdmin && (
              <div className="text-muted-foreground flex flex-row flex-wrap gap-2 text-[13px]">
                <dt className="text-popover-foreground flex flex-row items-center gap-2">
                  <UserIcon size={15} />
                  {t("Details.header.client")}
                </dt>
                <dd>{event.client.name}</dd>
              </div>
            )}
            {playlistInfo.map(({ icon, label, content }, index) => {
              return (
                <div
                  key={index}
                  className="text-muted-foreground flex flex-row flex-wrap gap-2 text-[13px]"
                >
                  <dt className="text-popover-foreground flex flex-row items-center gap-2">
                    {icon}
                    {label}
                  </dt>
                  <dd>
                    {format.dateTime(content, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              );
            })}
          </dl>
        </CardContent>
      </div>
      <CardFooter className="mx-(--card-spacing) flex-col items-stretch gap-3 border-t px-0 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "",
            })}
            href={`https://www.youtube.com/watch_videos?video_ids=${availableYoutubeSongs.join(",")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListVideoIcon />
            Generate playlist
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="" />}>
              <DownloadIcon />
              Export
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-40">
              <DownloadCSVItem playlistId={id}>
                <FileSpreadsheetIcon />
                Download CSV
              </DownloadCSVItem>
              {/* the print page lives in the admin panel */}
              {isAdmin && (
                <DropdownMenuItem
                  render={
                    <Link
                      href={{
                        pathname: "/admin/playlists/[playlistId]/print",
                        params: { playlistId: id },
                      }}
                    >
                      <PrinterIcon />
                      Print
                    </Link>
                  }
                />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {isAdmin && <TogglePlaylist isLocked={isLocked} playlistId={id} />}
      </CardFooter>
    </Card>
  );
}

export async function HeaderLabel({ label, date }: { label: string; date: Date }) {
  const format = await getFormatter();

  return (
    <p className="text-accent-foreground text-xs font-semibold tracking-widest break-all">
      {label}
      <span className="sm:hidden">
        <span aria-hidden="true" className="text-accent-foreground/50 mx-1.5">
          ·
        </span>
        <span>{format.dateTime(date, { dateStyle: "short" })}</span>
      </span>
    </p>
  );
}
