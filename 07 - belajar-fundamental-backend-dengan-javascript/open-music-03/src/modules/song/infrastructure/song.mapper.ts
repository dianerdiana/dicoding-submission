import { Song } from '../domain/entities/song.entity';
import { SongId } from '../domain/value-objects/song-id.vo';

export interface SongRow {
  id: string;
  title: string;
  year: number;
  genre: string;
  performer: string;
  duration?: number;
  album_id?: string;
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
export const mapSongEntityToRow = (entity: Song): SongRow => ({
  id: entity.getId().toString(),
  title: entity.getTitle(),
  year: entity.getYear(),
  genre: entity.getGenre(),
  performer: entity.getPerformer(),
  duration: entity.getDuration(),
  album_id: entity.getAlbumId(),
  created_at: entity.getCreatedAt().toISOString(),
  updated_at: entity.getUpdatedAt().toISOString(),
});
