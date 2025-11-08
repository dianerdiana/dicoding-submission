import { db } from '../../../shared/libs/db';
import { User } from '../domain/entities/user.entity';
import { mapUserRowToEntity, UserRow } from './user.mapper';

export class UserRepository {
  async save(user: User): Promise<void> {
    const primitive = user.toPrimitives();

    await db.query<UserRow>(
      `INSERT INTO users (id, fullname, username, password, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE
         SET
          fullname = EXCLUDED.fullname,
          username = EXCLUDED.username,
          password = EXCLUDED.password,
          updated_at = EXCLUDED.updated_at
         RETURNING *
         `,
      [
        primitive.id,
        primitive.fullname,
        primitive.username,
        primitive.password,
        primitive.createdAt,
        primitive.updatedAt,
      ],
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await db.query<UserRow>(`SELECT * FROM users WHERE username=$1`, [username]);

    const userRow = result.rows[0];
    if (!userRow) return null;

    return mapUserRowToEntity(userRow);
  }

  async findByIds(userIds: string[]): Promise<User[]> {
    const result = await db.query<UserRow>(`SELECT * FROM users WHERE id = ANY($1::text[])`, [
      userIds,
    ]);
    return result.rows.map((userRow) => mapUserRowToEntity(userRow));
  }
}
