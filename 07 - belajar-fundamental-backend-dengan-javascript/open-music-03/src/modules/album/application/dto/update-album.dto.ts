import z from 'zod';
import { updateAlbumSchema } from '../schemas/update-album.schema';

export type UpdateAlbumDto = z.infer<typeof updateAlbumSchema>;
