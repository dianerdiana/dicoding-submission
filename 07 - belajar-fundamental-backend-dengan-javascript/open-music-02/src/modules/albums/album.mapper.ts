import { AlbumEntity } from './album.entity';

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
export const mapAlbumRowToEntity = (row: AlbumRow): AlbumEntity => ({
  id: row.id,
  name: row.name,
  year: row.year,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapAlbumEntityToRow = (entity: AlbumEntity): AlbumRow => ({
  id: entity.id,
  name: entity.name,
  year: entity.year,
  created_at: entity.createdAt,
  updated_at: entity.updatedAt,
});
