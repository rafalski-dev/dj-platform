"use server";

import { getSession } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { CreateSongSchema, createSongSchema } from "@/validation/playlists";
import { revalidatePath } from "next/cache";

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
