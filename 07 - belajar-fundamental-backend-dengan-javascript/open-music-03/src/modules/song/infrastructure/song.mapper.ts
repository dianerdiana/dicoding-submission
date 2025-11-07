import { Song } from '../domain/entities/song.entity';
import { SongId } from '../domain/value-objects/song-id.vo';

export interface SongRow {
  id: string;
  title: string;
  year: number;
  genre: string;
  performer: string;
  duration?: number;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapSongRowToEntity = (row: SongRow): Song => {
  return new Song(
    new SongId(row.id),
    row.title,
    row.year,
    row.genre,
    row.performer,
    new Date(row.created_at),
    new Date(row.updated_at),

    row.duration,
  );
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
  created_at: entity.getCreatedAt().toISOString(),
  updated_at: entity.getUpdatedAt().toISOString(),
});
