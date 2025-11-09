import { addSongToPlaylistSchema } from '../../application/schemas/add-song-to-playlist.schema';

export const validateAddSongToPlaylist = async (payload: unknown) =>
  await addSongToPlaylistSchema.parseAsync(payload);
