import z from 'zod';

export const updateSongSchema = z.object({
  title: z.string().min(2),
  year: z.number(),
  genre: z.string(),
  performer: z.string(),
  duration: z.number().optional(),
  albumId: z.string().optional(),
});
