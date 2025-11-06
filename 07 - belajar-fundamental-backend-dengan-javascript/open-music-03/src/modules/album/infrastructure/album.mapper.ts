import { Album } from '../domain/entities/album.entity';
import { AlbumId } from '../domain/value-objects/album-id.vo';

export interface AlbumRow {
  id: string;
  name: string;
  year: number;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapAlbumRowToEntity = (row: AlbumRow): Album => {
  return new Album(
    new AlbumId(row.id),
    row.name,
    row.year,
    new Date(row.created_at),
    new Date(row.updated_at),
  );
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapAlbumEntityToRow = (entity: Album): AlbumRow => ({
  id: entity.getId().toString(),
  name: entity.getName(),
  year: entity.getYear(),
  created_at: entity.getCreatedAt().toISOString(),
  updated_at: entity.getUpdatedAt().toISOString(),
});
