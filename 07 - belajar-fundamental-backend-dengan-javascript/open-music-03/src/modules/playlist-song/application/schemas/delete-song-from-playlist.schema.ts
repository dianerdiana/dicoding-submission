import z from 'zod';

export const deleteSongFromPlaylistSchema = z.object({ songId: z.string() });
