import z from 'zod';

export const createPlaylistSchema = z.object({
  name: z.string(),
});

export const updatePlaylistSchema = z.object({
  name: z.string(),
});

export const validateSongIdSchema = z.object({
  songId: z.string(),
});

export const playlistSearchParamSchema = z.object({
  name: z.string().optional(),
});

export type CreatePlaylistPayload = z.infer<typeof createPlaylistSchema> & {
  owner: string;
};
export type UpdatePlaylistPayload = z.infer<typeof updatePlaylistSchema> & {
  owner: string;
};
export type PlaylistSearchParamPayload = z.infer<typeof playlistSearchParamSchema> & {
  owner: string;
};
