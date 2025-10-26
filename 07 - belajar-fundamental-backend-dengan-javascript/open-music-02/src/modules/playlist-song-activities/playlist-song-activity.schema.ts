import z from 'zod';

export const createActivitySchema = z.object({
  playlistId: z.string(),
  songId: z.string(),
  userId: z.string(),
  action: z.string(),
});
