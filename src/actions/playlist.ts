"use server";

import { adminCheck, getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { CreateSongSchema, createSongSchema } from "@/validation/playlists";
import { revalidatePath } from "next/cache";
import { PlaylistStatus } from "../../generated";

export async function createSongAction(songData: CreateSongSchema) {
  const session = await getSession();
  if (!session)
    return {
      success: false,
      status: "invalidAuth",
      message: "You have no permission to add a song",
    };

  const schema = createSongSchema();
  const result = schema.safeParse(songData);

  if (!result.success) {
    return {
      success: false,
      status: "invalid",
      message: "Couldn't add this song. Check the song details and try again.",
    };
  }

  try {
    if (session.user.role !== "Admin") {
      const playlist = await db.playlist.findFirst({
        where: {
          id: result.data.playlistId,
          event: { client: { userId: session.user.id } },
        },
        select: { id: true },
      });

      if (!playlist)
        return {
          success: false,
          status: "invalidAuth",
          message: "You have no permission to add a song",
        };
    }

    const playlistStatus = await db.playlist.findFirst({
      where: { id: result.data.playlistId },
      select: { status: true },
    });

    if (playlistStatus?.status === PlaylistStatus.Locked) {
      return { success: false, status: "invalid", message: "This playlist is locked." };
    }

    await db.song.create({
      data: result.data,
    });
    revalidatePath("/[locale]/admin/playlists/[playlistId]", "page");
    return { success: true, status: "success", message: "Song has been added" };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: "Something went wrong. Please try again." };
  }
}

export async function deleteSongAction(songId: string, playlistId: string) {
  const session = await getSession();
  if (!session)
    return {
      success: false,
      status: "invalidAuth",
      message: "You have no permission to delete a song",
    };

  try {
    if (session.user.role !== "Admin") {
      const playlist = await db.playlist.findFirst({
        where: {
          id: playlistId,
          event: { client: { userId: session.user.id } },
        },
        select: { id: true },
      });

      if (!playlist)
        return {
          success: false,
          status: "invalidAuth",
          message: "You have no permission to delete a song",
        };
    }

    const playlistStatus = await db.playlist.findFirst({
      where: { id: playlistId },
      select: { status: true },
    });

    if (playlistStatus?.status === PlaylistStatus.Locked) {
      return { success: false, status: "invalid", message: "This playlist is locked." };
    }

    const song = await db.song.findFirst({ where: { id: songId, playlistId } });
    if (!song) {
      return { success: false, status: "error", message: "Song doesn't exist." };
    }

    await db.song.delete({ where: { id: songId } });
    revalidatePath("/[locale]/admin/playlists/[playlistId]", "page");
    return { success: true, status: "success", message: "Song has been removed" };
  } catch (error) {
    console.error(error);
    return { success: false, status: "error", message: "Something went wrong. Please try again." };
  }
}

export async function togglePlaylistAction(playlistId: string) {
  await adminCheck();

  const playlistStatus = await db.playlist.findFirst({
    select: { status: true },
    where: { id: playlistId },
  });

  if (!playlistStatus) {
    return { success: false, status: "invalid", message: "Playlist doesn't exist" };
  }

  try {
    if (playlistStatus.status === PlaylistStatus.Open) {
      await db.playlist.update({
        data: { status: PlaylistStatus.Locked },
        where: { id: playlistId },
      });
      revalidatePath("/[locale]/admin/playlists/[playlistId]", "page");

      return { success: true, status: "success", message: "Playlist switched to locked" };
    }

    await db.playlist.update({
      data: { status: PlaylistStatus.Open },
      where: { id: playlistId },
    });
    revalidatePath("/[locale]/admin/playlists/[playlistId]", "page");
    return { success: true, status: "success", message: "Playlist switched to open" };
  } catch {
    return {
      success: false,
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }
}
