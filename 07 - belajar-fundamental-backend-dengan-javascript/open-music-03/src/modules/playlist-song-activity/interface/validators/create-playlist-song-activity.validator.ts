import { createPlaylistSongActivitySchema } from '../../application/schemas/create-playlist-song-activity.schema';

export const validateCreatePlaylistSongActivity = async (payload: unknown) =>
  await createPlaylistSongActivitySchema.parseAsync(payload);
