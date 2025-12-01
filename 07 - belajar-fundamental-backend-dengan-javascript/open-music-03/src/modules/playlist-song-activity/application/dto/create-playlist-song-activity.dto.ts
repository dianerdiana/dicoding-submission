import z from 'zod';
import { createPlaylistSongActivitySchema } from '../schemas/create-playlist-song-activity.schema';

export type CreatePlaylistSongActivityDto = z.infer<typeof createPlaylistSongActivitySchema>;
