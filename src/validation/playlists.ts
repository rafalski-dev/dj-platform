import z from "zod";
import { SongMoment, SongType } from "../../generated";

export function createSongSchema() {
  return z.object({
    artist: z.string().trim().max(250).nullable(),
    title: z.string().trim().min(1).max(250),
    type: z.enum(SongType),
    moment: z.union([z.literal(null), z.enum(SongMoment)]),
    playlistId: z.string(),
    deezerId: z.string().nullable(),
    thumbnailURL: z.httpUrl().nullable(),
    youtubeURL: z.httpUrl().nullable(),
  });
}

export type CreateSongSchema = z.infer<ReturnType<typeof createSongSchema>>;
