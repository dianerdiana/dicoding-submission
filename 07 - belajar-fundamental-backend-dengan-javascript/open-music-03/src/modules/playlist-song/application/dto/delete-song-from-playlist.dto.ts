import z from 'zod';
import { deleteSongFromPlaylistSchema } from '../schemas/delete-song-from-playlist.schema';

export type DeleteSongFromPlaylistDto = z.infer<typeof deleteSongFromPlaylistSchema> & {
  playlistId: string;
  userId: string;
};
