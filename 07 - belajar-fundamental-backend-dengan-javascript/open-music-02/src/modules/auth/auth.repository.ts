import { db } from '../../database';
import { AuthEntity } from './auth.entity';
import { AuthRow, mapAuthRowToEntity } from './auth.mapper';
export class AuthRepository {
  private tableName = 'authentications';

  async create(auth: AuthEntity): Promise<AuthEntity | null> {
    const result = await db.query<AuthRow>(
      `INSERT INTO ${this.tableName}(user_id, refresh_token) VALUES 
      ($1, $2) RETURNING *`,
      [auth.userId, auth.refreshToken],
    );

    const newAuthRow = result.rows[0];
    if (!newAuthRow) return null;

    return mapAuthRowToEntity(newAuthRow);
  }

  async findByRefreshToken(refreshToken: string): Promise<AuthEntity | null> {
    const result = await db.query<AuthRow>(
      `SELECT * FROM ${this.tableName} WHERE refresh_token=$1`,
      [refreshToken],
    );

    const existingAuth = result.rows[0];
    if (!existingAuth) return null;

    return mapAuthRowToEntity(existingAuth);
  }

  async delete(refreshToken: string): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE refresh_token=$1`, [refreshToken]);
  }
}
