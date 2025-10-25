import z from 'zod';

export const createPlaylistSchema = z.object({
  name: z.string(),
});

export const updatePlaylistSchema = z.object({
  name: z.string(),
});
export const playlistSearchParamSchema = z.object({
  name: z.string().optional(),
});
