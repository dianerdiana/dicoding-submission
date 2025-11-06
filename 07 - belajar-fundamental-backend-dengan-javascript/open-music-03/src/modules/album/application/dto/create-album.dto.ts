import z from 'zod';
import { createAlbumSchema } from '../schemas/create-album.schema';

export type CreateAlbumDto = z.infer<typeof createAlbumSchema>;
