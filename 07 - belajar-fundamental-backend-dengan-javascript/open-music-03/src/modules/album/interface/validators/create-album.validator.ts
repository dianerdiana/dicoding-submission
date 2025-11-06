import { createAlbumSchema } from '../../application/schemas/create-album.schema';

export const validateCreateAlbum = async (payload: unknown) =>
  await createAlbumSchema.parseAsync(payload);
