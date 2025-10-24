import z from 'zod';

export const createPlaylistSchema = z.object({
  name: z.string(),
  owner: z.string(),
});

export const updatePlaylistSchema = z.object({
  name: z.string(),
  owner: z.string(),
});

export const playlistSearchParamSchema = z.object({
  name: z.string().optional(),
  performer: z.string().optional(),
  albumId: z.string().optional(),
});

export type CreatePlaylistPayload = z.input<typeof createPlaylistSchema>;
export type UpdatePlaylistPayload = z.input<typeof updatePlaylistSchema>;
