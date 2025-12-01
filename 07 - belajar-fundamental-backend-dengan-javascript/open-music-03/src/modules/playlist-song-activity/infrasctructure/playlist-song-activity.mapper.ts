import { PlaylistSongActivity } from '../domain/entities/playlist-song-activity.entity';
import { PlaylistSongActivityId } from '../domain/value-objects/playlist-song-activity-id.vo';

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
): PlaylistSongActivity => {
  return new PlaylistSongActivity({
    id: new PlaylistSongActivityId(row.id),
    playlistId: row.playlist_id,
    songId: row.song_id,
    userId: row.user_id,
    action: row.action,
    time: row.time,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapPlaylistSongActivityEntityToRow = (
  entity: PlaylistSongActivity,
): PlaylistSongActivityRow => {
  const auth = entity.toPrimitives();

  return {
    id: auth.id,
    playlist_id: auth.playlistId,
    song_id: auth.songId,
    user_id: auth.userId,
    action: auth.action,
    time: auth.time,
    created_at: auth.createdAt,
    updated_at: auth.updatedAt,
  };
};
