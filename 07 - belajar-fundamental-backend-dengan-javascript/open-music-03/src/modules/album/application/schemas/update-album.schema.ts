import z from 'zod';

export const updateAlbumSchema = z.object({
  name: z.string(),
  year: z.number(),
});
