import { PlaylistSongActivityEntity } from './playlist-song-activity.entity';

export interface PlaylistSongActivityRow {
  id: string;
  playlist_id: string;
  song_id: string;
  user_id: string;
  action: string;
  time: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapPlaylistSongActivityRowToEntity = (
  row: PlaylistSongActivityRow,
): PlaylistSongActivityEntity => ({
  id: row.id,
  playlistId: row.playlist_id,
  songId: row.song_id,
  userId: row.user_id,
  action: row.action,
  time: row.time,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapPlaylistSongActivityEntityToRow = (
  entity: PlaylistSongActivityEntity,
): PlaylistSongActivityRow => ({
  id: entity.id,
  playlist_id: entity.playlistId,
  song_id: entity.songId,
  user_id: entity.userId,
  action: entity.action,
  time: entity.time,
  created_at: entity.createdAt,
  updated_at: entity.updatedAt,
});
