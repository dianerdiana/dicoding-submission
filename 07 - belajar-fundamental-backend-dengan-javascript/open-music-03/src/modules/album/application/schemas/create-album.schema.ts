import z from 'zod';

export const createAlbumSchema = z.object({
  name: z.string(),
  year: z.number(),
});
