import { User } from '../domain/entities/user.entity';
import { UserId } from '../domain/value-objects/user-id.vo';

export interface UserRow {
  id: string;
  fullname: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapUserRowToEntity = (row: UserRow): User => {
  return new User({
    id: new UserId(row.id),
    fullname: row.fullname,
    username: row.username,
    password: row.password,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapUserEntityToRow = (entity: User): UserRow => {
  const user = entity.toPrimitives();

  return {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    password: user.password,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
};
