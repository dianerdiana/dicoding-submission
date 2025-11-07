import z from 'zod';
import { updateSongSchema } from '../schemas/update-song.schema';

export type UpdateSongDto = z.infer<typeof updateSongSchema>;
