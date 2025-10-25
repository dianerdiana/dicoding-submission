import z from 'zod';
import { createSongSchema, updateSongSchema } from './song.schema';

export type CreateSongDTO = z.input<typeof createSongSchema>;
export type UpdateSongDTO = z.input<typeof updateSongSchema>;
