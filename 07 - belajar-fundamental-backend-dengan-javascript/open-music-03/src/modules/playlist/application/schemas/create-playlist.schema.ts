import z from 'zod';

export const createPlaylistSchema = z.object({
  name: z.string(),
});
