import { db } from '../../database';
import { mapCollaborationRowToEntity, CollaborationRow } from './collaboration.mapper';
import { CollaborationEntity } from './collaboration.entity';

export class CollaborationRepository {
  private tableName = 'collaborations';

  async create({
    playlistId,
    userId,
  }: Omit<
    CollaborationEntity,
    'id' | 'createdAt' | 'updatedAt'
  >): Promise<CollaborationEntity | null> {
    const result = await db.query<CollaborationRow>(
      `INSERT INTO ${this.tableName}(playlist_id,user_id) VALUES 
      ($1, $2) RETURNING id`,
      [playlistId, userId],
    );

    const newCollaborationRow = result.rows[0];
    if (!newCollaborationRow) return null;

    return mapCollaborationRowToEntity(newCollaborationRow);
  }

  async findByUserId(userId: string): Promise<CollaborationEntity[]> {
    const result = await db.query<CollaborationRow>(
      `SELECT * FROM ${this.tableName} WHERE user_id=$1`,
      [userId],
    );

    return result.rows.map((r) => mapCollaborationRowToEntity(r));
  }

  async findByUserIdAndPlaylistId(
    userId: string,
    playlistId: string,
  ): Promise<CollaborationEntity | null> {
    const result = await db.query<CollaborationRow>(
      `SELECT * FROM ${this.tableName} WHERE user_id=$1 AND playlist_id=$2`,
      [userId, playlistId],
    );

    const collaborationRow = result.rows[0];
    if (!collaborationRow) return null;

    return mapCollaborationRowToEntity(collaborationRow);
  }

  async delete({ playlistId, userId }: { playlistId: string; userId: string }): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE playlist_id=$1 AND user_id=$2`, [
      playlistId,
      userId,
    ]);
  }
}
