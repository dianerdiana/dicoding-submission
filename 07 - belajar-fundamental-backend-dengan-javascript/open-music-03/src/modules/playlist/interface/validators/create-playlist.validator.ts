import { createPlaylistSchema } from '../../application/schemas/create-playlist.schema';

export const validateCreatePlaylist = async (payload: unknown) =>
  await createPlaylistSchema.parseAsync(payload);
