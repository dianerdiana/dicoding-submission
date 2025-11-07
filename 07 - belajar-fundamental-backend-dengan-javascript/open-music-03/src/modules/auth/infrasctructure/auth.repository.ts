import { db } from '../../../shared/libs/db';
import { Auth } from '../domain/entities/auth.entity';
import { AuthRow, mapAuthRowToEntity } from './auth.mapper';

export class AuthRepository {
  async save(auth: Auth): Promise<void> {
    const primitive = auth.toPrimitives();

    await db.query<AuthRow>(
      `INSERT INTO authentications (id, user_id, refresh_token, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (id) DO UPDATE
           SET
            user_id = EXCLUDED.user_id,
            refresh_token = EXCLUDED.refresh_token,
            updated_at = EXCLUDED.updated_at
           RETURNING *
           `,
      [
        primitive.id,
        primitive.userId,
        primitive.refreshToken,
        primitive.createdAt,
        primitive.updatedAt,
      ],
    );
  }

  async findByUserId(userId: string): Promise<Auth | null> {
    const result = await db.query<AuthRow>(`SELECT * FROM authentications WHERE user_id=$1`, [
      userId,
    ]);

    const authRow = result.rows[0];
    if (!authRow) return null;

    return mapAuthRowToEntity(authRow);
  }

  async delete(auth: Auth): Promise<boolean> {
    const primitive = auth.toPrimitives();
    await db.query(`DELETE FROM authentications WHERE user_id=$1 RETURNING *`, [primitive.userId]);

    return true;
  }
}
