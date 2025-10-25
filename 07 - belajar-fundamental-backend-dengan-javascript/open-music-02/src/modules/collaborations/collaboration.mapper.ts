import { CollaborationEntity } from './collaboration.entity';

export interface CollaborationRow {
  id: string;
  playlist_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapCollaborationRowToEntity = (row: CollaborationRow): CollaborationEntity => ({
  id: row.id,
  playlistId: row.playlist_id,
  userId: row.user_id,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapCollaborationEntityToRow = (entity: CollaborationEntity): CollaborationRow => ({
  id: entity.id,
  playlist_id: entity.playlistId,
  user_id: entity.userId,
  created_at: entity.createdAt,
  updated_at: entity.updatedAt,
});
