import z from 'zod';
import { createPlaylistSchema } from '../schemas/create-playlist.schema';

export type CreatePlaylistDto = z.infer<typeof createPlaylistSchema>;
