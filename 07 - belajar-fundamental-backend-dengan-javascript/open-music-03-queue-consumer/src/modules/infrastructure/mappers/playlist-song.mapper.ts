import { PlaylistSong } from '@modules/domain/entities/playlist-song.entity.js';
import { PlaylistSongId } from '@modules/domain/value-objects/playlist-song-id.vo.js';

export interface PlaylistSongRow {
  id: string;
  playlist_id: string;
  song_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapPlaylistSongRowToEntity = (row: PlaylistSongRow): PlaylistSong => {
  return new PlaylistSong({
    id: new PlaylistSongId(row.id),
    playlistId: row.playlist_id,
    songId: row.song_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapPlaylistSongEntityToRow = (entity: PlaylistSong): PlaylistSongRow => {
  const playlistSong = entity.toPrimitives();

  return {
    id: playlistSong.id,
    playlist_id: playlistSong.playlistId,
    song_id: playlistSong.songId,
    created_at: playlistSong.createdAt,
    updated_at: playlistSong.updatedAt,
  };
};
