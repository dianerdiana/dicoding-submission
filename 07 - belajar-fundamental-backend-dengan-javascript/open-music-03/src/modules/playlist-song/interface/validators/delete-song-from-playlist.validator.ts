import { deleteSongFromPlaylistSchema } from '../../application/schemas/delete-song-from-playlist.schema';

export const validateDeleteSongFromPlaylist = async (payload: unknown) =>
  await deleteSongFromPlaylistSchema.parseAsync(payload);
