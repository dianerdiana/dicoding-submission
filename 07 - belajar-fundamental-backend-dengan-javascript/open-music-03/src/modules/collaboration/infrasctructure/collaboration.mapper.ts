import { Collaboration } from '../domain/entities/collaboration.entity';
import { CollaborationId } from '../domain/value-objects/collaboration-id.vo';

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
export const mapCollaborationRowToEntity = (row: CollaborationRow): Collaboration => {
  return new Collaboration({
    id: new CollaborationId(row.id),
    playlistId: row.playlist_id,
    userId: row.user_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapCollaborationEntityToRow = (entity: Collaboration): CollaborationRow => {
  const auth = entity.toPrimitives();

  return {
    id: auth.id,
    user_id: auth.userId,
    playlist_id: auth.playlistId,
    created_at: auth.createdAt,
    updated_at: auth.updatedAt,
  };
};
