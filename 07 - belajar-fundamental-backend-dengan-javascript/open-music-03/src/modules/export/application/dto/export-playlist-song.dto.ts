import z from 'zod';
import { exportPlaylistSongSchema } from '../schemas/export-playlist-song.schema';

export type ExportPlaylistSongDto = z.infer<typeof exportPlaylistSongSchema>;
