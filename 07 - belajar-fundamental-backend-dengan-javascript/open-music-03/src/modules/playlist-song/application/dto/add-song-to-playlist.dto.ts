import z from 'zod';
import { addSongToPlaylistSchema } from '../schemas/add-song-to-playlist.schema';

export type AddSongToPlaylistDto = z.infer<typeof addSongToPlaylistSchema> & {
  playlistId: string;
  userId: string;
};
