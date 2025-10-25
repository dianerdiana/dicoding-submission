import { db } from '../../database';
import { mapCollaborationRowToEntity, CollaborationRow } from './collaboration.mapper';
import { CollaborationEntity } from './collaboration.entity';

export class CollaborationRepository {
  private tableName = 'collaborations';
  private playlistTableName = 'playlists';

  async create(
    playlistSong: Omit<CollaborationEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CollaborationEntity | null> {
    const result = await db.query<CollaborationRow>(
      `INSERT INTO ${this.tableName}(playlist_id,user_id) VALUES 
      ($1, $2) RETURNING id`,
      [playlistSong.playlistId, playlistSong.userId],
    );

    const newCollaborationRow = result.rows[0];
    if (!newCollaborationRow) return null;

    return mapCollaborationRowToEntity(newCollaborationRow);
  }

  async delete({ playlistId, userId }: { playlistId: string; userId: string }): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE playlist_id=$1 AND user_id=$2`, [
      playlistId,
      userId,
    ]);
  }
}
