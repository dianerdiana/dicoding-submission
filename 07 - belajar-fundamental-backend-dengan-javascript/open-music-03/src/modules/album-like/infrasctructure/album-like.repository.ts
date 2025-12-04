import { db } from '../../../shared/libs/db';
import { AlbumLike } from '../domain/entities/album-like.entity';
import { AlbumLikeRow, mapAlbumLikeRowToEntity } from './album-like.mapper';

const TABLE_NAME = 'user_album_likes';

export class AlbumLikeRepository {
  async save(albumLike: AlbumLike): Promise<void> {
    const primitive = albumLike.toPrimitives();

    await db.query<AlbumLikeRow>(
      `INSERT INTO ${TABLE_NAME} (id, album_id, user_id, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (id) DO UPDATE
           SET
            album_id = EXCLUDED.album_id,
            user_id = EXCLUDED.user_id,
            updated_at = EXCLUDED.updated_at
           RETURNING *
           `,
      [primitive.id, primitive.albumId, primitive.userId, primitive.createdAt, primitive.updatedAt],
    );
  }

  async findAllByAlbumId(albumId: string): Promise<AlbumLike[]> {
    const result = await db.query<AlbumLikeRow>(`SELECT * FROM ${TABLE_NAME} WHERE album_id=$1`, [
      albumId,
    ]);
    return result.rows.map((r) => mapAlbumLikeRowToEntity(r));
  }

  async countAllByAlbumId(albumId: string): Promise<number> {
    const result = await db.query<{ count: number }>(
      `SELECT COUNT(*) FROM ${TABLE_NAME} WHERE album_id=$1`,
      [albumId],
    );

    return Number(result.rows[0].count);
  }

  async findByAlbumIdAndUserId({
    albumId,
    userId,
  }: {
    albumId: string;
    userId: string;
  }): Promise<AlbumLike | null> {
    const result = await db.query<AlbumLikeRow>(
      `SELECT * FROM ${TABLE_NAME} WHERE album_id=$1 AND user_id=$2`,
      [albumId, userId],
    );

    const albumLikeRow = result.rows[0];
    if (!albumLikeRow) return null;

    return mapAlbumLikeRowToEntity(albumLikeRow);
  }

  async delete(albumLike: AlbumLike): Promise<boolean> {
    const primitive = albumLike.toPrimitives();
    await db.query(`DELETE FROM ${TABLE_NAME} WHERE album_id=$1 AND user_id=$2`, [
      primitive.albumId,
      primitive.userId,
    ]);

    return true;
  }
}
