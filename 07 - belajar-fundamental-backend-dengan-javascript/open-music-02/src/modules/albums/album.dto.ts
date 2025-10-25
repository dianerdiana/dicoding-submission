import z from 'zod';
import { createAlbumSchema, updateAlbumSchema } from './album.schema';

export type CreateAlbumDto = z.infer<typeof createAlbumSchema>;
export type UpdateAlbumDto = z.infer<typeof updateAlbumSchema>;
