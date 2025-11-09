import z from 'zod';

export const addSongToPlaylistSchema = z.object({ songId: z.string() });
