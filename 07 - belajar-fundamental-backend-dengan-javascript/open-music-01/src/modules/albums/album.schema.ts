import z from 'zod';

export const createAlbumSchema = z.object({
  name: z.string(),
  year: z.number(),
});

export const updateAlbumSchema = z.object({
  name: z.string(),
  year: z.number(),
});

export const albumIdParamSchema = z.object({
  id: z.uuid({ error: 'Album is not found' }),
});

export type CreateAlbumPayload = z.input<typeof createAlbumSchema>;
export type UpdateAlbumPayload = z.input<typeof updateAlbumSchema>;
