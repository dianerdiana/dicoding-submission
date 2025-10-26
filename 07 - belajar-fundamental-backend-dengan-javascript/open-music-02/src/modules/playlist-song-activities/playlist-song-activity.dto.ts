import z from 'zod';
import { createActivitySchema } from './playlist-song-activity.schema';

export type CreatePlaylistSongActivityDto = z.infer<typeof createActivitySchema>;
