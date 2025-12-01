import z from 'zod';

export const createPlaylistSongActivitySchema = z.object({
  playlistId: z.string(),
  songId: z.string(),
  userId: z.string(),
  action: z.string(),
});
