import z from 'zod';

export const createSongSchema = z.object({
  title: z.string(),
  year: z.number(),
  performer: z.string(),
  genre: z.string(),
  duration: z.number().optional().nullable(),
  albumId: z.string().optional().nullable(),
});

export const updateSongSchema = z.object({
  title: z.string(),
  year: z.number(),
  performer: z.string(),
  genre: z.string(),
  duration: z.number().optional().nullable(),
  albumId: z.string().optional().nullable(),
});

export const songSearchParamSchema = z.object({
  title: z.string().optional(),
  performer: z.string().optional(),
  albumId: z.string().optional(),
});

export type CreateSongPayload = z.input<typeof createSongSchema>;
export type UpdateSongPayload = z.input<typeof updateSongSchema>;
