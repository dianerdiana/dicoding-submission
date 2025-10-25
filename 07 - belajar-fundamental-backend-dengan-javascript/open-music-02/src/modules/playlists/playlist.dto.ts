import z from 'zod';
import {
  createPlaylistSchema,
  playlistSearchParamSchema,
  updatePlaylistSchema,
} from './playlist.schema';
import { PlaylistEntity } from './playlist.entity';

// Payload Dto
export type CreatePlaylistDto = z.infer<typeof createPlaylistSchema> & {
  userId: string;
};

export type UpdatePlaylistDto = z.infer<typeof updatePlaylistSchema> & {
  userId: string;
};

export type PlaylistSearchParamDto = z.infer<typeof playlistSearchParamSchema> & {
  userId: string;
};

export type ValidatePlaylistOwnerDto = {
  playlistId: string;
  userId: string;
};

export type GetAllSongsDto = {
  id: string;
};

// Response Dto
export type PlaylistDto = PlaylistEntity;
export type SanitizedPlaylist = Omit<PlaylistEntity, 'owner' | 'createdAt' | 'updatedAt'> & {
  username: string;
};
export type PlaylistResponseDto = { playlist: PlaylistDto };
export type SanitizedPlaylistResponseDto = { playlist: SanitizedPlaylist };
export type SanitizedAllPlaylistsResponseDto = { playlists: SanitizedPlaylist[] };
