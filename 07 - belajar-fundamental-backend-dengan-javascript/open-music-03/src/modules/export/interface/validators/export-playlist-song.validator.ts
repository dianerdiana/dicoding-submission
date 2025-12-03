import { exportPlaylistSongSchema } from '../../application/schemas/export-playlist-song.schema';

export const validateExportPlaylistSong = async (payload: unknown) =>
  await exportPlaylistSongSchema.parseAsync(payload);
