import z from 'zod';
import {
  createPlaylistSchema,
  playlistSearchParamSchema,
  updatePlaylistSchema,
} from './playlist.schema';
import { PlaylistEntity } from './playlist.entity';

// Payload Dto
export type CreatePlaylistDto = z.infer<typeof createPlaylistSchema> & {
  owner: string;
};

export type UpdatePlaylistDto = z.infer<typeof updatePlaylistSchema> & {
  owner: string;
};

export type PlaylistSearchParamDto = z.infer<typeof playlistSearchParamSchema> & {
  owner: string;
};

// Response Dto
export type PlaylistDto = PlaylistEntity;
export type SanitizedPlaylist = Omit<PlaylistEntity, 'owner'> & { username: string };
export type PlaylistResponseDto = { playlist: PlaylistDto };
export type SanitizedPlaylistResponseDto = { playlist: SanitizedPlaylist };
export type SanitizedAllPlaylistsResponseDto = { playlists: SanitizedPlaylist[] };
export type AddSongToPlaylistDto = { id: string; songId: string; owner: string };
