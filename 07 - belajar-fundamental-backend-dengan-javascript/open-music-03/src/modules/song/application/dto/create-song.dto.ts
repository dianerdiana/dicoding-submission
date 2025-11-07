import z from 'zod';
import { createSongSchema } from '../schemas/create-song.schema';

export type CreateSongDto = z.infer<typeof createSongSchema>;
