import z from 'zod';
import {
  createPlaylistSchema,
  playlistSearchParamSchema,
  updatePlaylistSchema,
} from './playlist.schema';
import { PlaylistEntity } from './playlist.entity';

// Payload DTO
export type CreatePlaylistDTO = z.infer<typeof createPlaylistSchema> & {
  owner: string;
};

export type UpdatePlaylistDTO = z.infer<typeof updatePlaylistSchema> & {
  owner: string;
};

export type PlaylistSearchParamDTO = z.infer<typeof playlistSearchParamSchema> & {
  owner: string;
};

// Response DTO
export type PlaylistDTO = PlaylistEntity;
export type SanitizedPlaylist = Omit<PlaylistEntity, 'owner'> & { username: string };
export type PlaylistResponseDTO = { playlist: PlaylistDTO };
export type SanitizedPlaylistResponseDTO = { playlist: SanitizedPlaylist };
export type SanitizedAllPlaylistsResponseDTO = { playlists: SanitizedPlaylist[] };
export type AddSongToPlaylistDTO = { id: string; songId: string; owner: string };
