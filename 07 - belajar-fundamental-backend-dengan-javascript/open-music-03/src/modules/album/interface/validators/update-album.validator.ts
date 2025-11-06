import { updateAlbumSchema } from '../../application/schemas/update-album.schema';

export const validateUpdateAlbum = async (payload: unknown) =>
  await updateAlbumSchema.parseAsync(payload);
