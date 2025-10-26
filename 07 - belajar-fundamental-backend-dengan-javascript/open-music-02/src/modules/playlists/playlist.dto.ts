import z from 'zod';
import {
  createPlaylistSchema,
  playlistSearchParamSchema,
  updatePlaylistSchema,
} from './playlist.schema';
import { PlaylistEntity } from './playlist.entity';

// Payload Dto
export type CreatePlaylistPayloadDto = z.infer<typeof createPlaylistSchema> & {
  authId: string;
};

export type UpdatePlaylistPayloadDto = z.infer<typeof updatePlaylistSchema> & {
  authId: string;
};

export type GetAllPlaylistPayloadDto = z.infer<typeof playlistSearchParamSchema> & {
  authId: string;
};

export type GetOwnPlaylistPayloadDto = {
  playlistId: string;
  authId: string;
};

// Response
export type CreatePlaylistResponseDto = { playlistId: string };
export type UpdatePlaylistResponseDto = {
  playlist: Omit<PlaylistEntity & { username: string }, 'owner'>;
};
export type GetPlaylistResponseDto = { playlist: PlaylistEntity };
export type GetAllPlaylistResponseDto = {
  playlists: Omit<PlaylistEntity & { username: string }, 'owner' | 'createdAt' | 'updatedAt'>[];
};
export type GetOwnPlaylistResponseDto = {
  playlist: Omit<PlaylistEntity & { username: string }, 'owner'>;
};
