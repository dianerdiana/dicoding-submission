import { Song } from '@modules/domain/entities/song.entity.js';
import { SongId } from '@modules/domain/value-objects/song-id.vo.js';

export interface SongRow {
  id: string;
  title: string;
  year: number;
  genre: string;
  performer: string;
  duration?: number | undefined;
  album_id?: string | undefined;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapSongRowToEntity = (row: SongRow): Song => {
  return new Song({
    id: new SongId(row.id),
    title: row.title,
    year: row.year,
    genre: row.genre,
    performer: row.performer,
    duration: row.duration,
    albumId: row.album_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapSongEntityToRow = (entity: Song): SongRow => {
  const song = entity.toPrimitives();

  return {
    id: song.id,
    title: song.title,
    year: song.year,
    genre: song.genre,
    performer: song.performer,
    duration: song.duration,
    album_id: song.albumId,
    created_at: song.createdAt,
    updated_at: song.updatedAt,
  };
};
