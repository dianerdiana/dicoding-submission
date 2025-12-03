import { Album } from '../domain/entities/album.entity';
import { AlbumId } from '../domain/value-objects/album-id.vo';

export interface AlbumRow {
  id: string;
  name: string;
  year: number;
  cover: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapAlbumRowToEntity = (row: AlbumRow): Album => {
  return new Album({
    id: new AlbumId(row.id),
    name: row.name,
    year: row.year,
    cover: row.cover ? row.cover : undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapAlbumEntityToRow = (entity: Album): AlbumRow => {
  const album = entity.toPrimitives();

  return {
    id: album.id,
    name: album.name,
    year: album.year,
    cover: album.cover,
    created_at: album.createdAt,
    updated_at: album.updatedAt,
  };
};
