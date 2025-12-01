import { db } from '../../../shared/libs/db';
import { Collaboration } from '../domain/entities/collaboration.entity';
import { CollaborationRow, mapCollaborationRowToEntity } from './collaboration.mapper';

const TABLE_NAME = 'collaborations';

export class CollaborationRepository {
  async save(collaboration: Collaboration): Promise<void> {
    const primitive = collaboration.toPrimitives();

    await db.query<CollaborationRow>(
      `INSERT INTO ${TABLE_NAME} (id, playlist_id, user_id, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (id) DO UPDATE
           SET
            playlist_id = EXCLUDED.playlist_id,
            user_id = EXCLUDED.user_id,
            updated_at = EXCLUDED.updated_at
           RETURNING *
           `,
      [
        primitive.id,
        primitive.playlistId,
        primitive.userId,
        primitive.createdAt,
        primitive.updatedAt,
      ],
    );
  }

  async findAllByUserId(userId: string): Promise<Collaboration[]> {
    const result = await db.query<CollaborationRow>(
      `SELECT * FROM ${TABLE_NAME} WHERE user_id=$1`,
      [userId],
    );
    return result.rows.map((r) => mapCollaborationRowToEntity(r));
  }

  async findByUserId(userId: string): Promise<Collaboration | null> {
    const result = await db.query<CollaborationRow>(
      `SELECT * FROM ${TABLE_NAME} WHERE user_id=$1`,
      [userId],
    );

    const collaborationRow = result.rows[0];
    if (!collaborationRow) return null;

    return mapCollaborationRowToEntity(collaborationRow);
  }

  async findByPlaylistIdAndUserId({
    playlistId,
    userId,
  }: {
    playlistId: string;
    userId: string;
  }): Promise<Collaboration | null> {
    const result = await db.query<CollaborationRow>(
      `SELECT * FROM ${TABLE_NAME} WHERE playlist_id=$1 AND user_id=$2`,
      [playlistId, userId],
    );

    const collaborationRow = result.rows[0];
    if (!collaborationRow) return null;

    return mapCollaborationRowToEntity(collaborationRow);
  }

  async delete(collaboration: Collaboration): Promise<boolean> {
    const primitive = collaboration.toPrimitives();
    await db.query(`DELETE FROM ${TABLE_NAME} WHERE playlist_id=$1 AND user_id=$2`, [
      primitive.playlistId,
      primitive.userId,
    ]);

    return true;
  }
}
