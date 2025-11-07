import { Auth } from '../domain/entities/auth.entity';
import { AuthId } from '../domain/value-objects/auth-id.vo';

export interface AuthRow {
  id: string;
  user_id: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapAuthRowToEntity = (row: AuthRow): Auth => {
  return new Auth({
    id: new AuthId(row.id),
    userId: row.user_id,
    refreshToken: row.refresh_token,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapAuthEntityToRow = (entity: Auth): AuthRow => {
  const auth = entity.toPrimitives();

  return {
    id: auth.id,
    user_id: auth.userId,
    refresh_token: auth.refreshToken,
    created_at: auth.createdAt,
    updated_at: auth.updatedAt,
  };
};
