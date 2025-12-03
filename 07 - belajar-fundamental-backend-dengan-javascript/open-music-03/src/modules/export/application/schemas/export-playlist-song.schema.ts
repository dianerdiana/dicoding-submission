import z from 'zod';

export const exportPlaylistSongSchema = z.object({
  targetEmail: z.string(),
});
