import { AlbumLike } from '../domain/entities/album-like.entity';
import { AlbumLikeId } from '../domain/value-objects/album-like-id.vo';

export interface AlbumLikeRow {
  id: string;
  album_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapAlbumLikeRowToEntity = (row: AlbumLikeRow): AlbumLike => {
  return new AlbumLike({
    id: new AlbumLikeId(row.id),
    albumId: row.album_id,
    userId: row.user_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapAlbumLikeEntityToRow = (entity: AlbumLike): AlbumLikeRow => {
  const auth = entity.toPrimitives();

  return {
    id: auth.id,
    user_id: auth.userId,
    album_id: auth.albumId,
    created_at: auth.createdAt,
    updated_at: auth.updatedAt,
  };
};
