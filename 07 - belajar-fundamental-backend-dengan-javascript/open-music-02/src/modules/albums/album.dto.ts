import z from 'zod';
import { createAlbumSchema, updateAlbumSchema } from './album.schema';

export type CreateAlbumDTO = z.infer<typeof createAlbumSchema>;
export type UpdateAlbumDTO = z.infer<typeof updateAlbumSchema>;
