import z from 'zod';

export const validateSongIdSchema = z.object({
  songId: z.string(),
});
