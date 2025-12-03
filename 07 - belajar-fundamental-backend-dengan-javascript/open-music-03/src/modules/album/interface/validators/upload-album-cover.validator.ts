import { uploadAlbumCoverSchema } from '../../application/schemas/upload-album-cover.schema';

export const validateUploadAlbumCover = async (payload: unknown) =>
  await uploadAlbumCoverSchema.parseAsync(payload);
