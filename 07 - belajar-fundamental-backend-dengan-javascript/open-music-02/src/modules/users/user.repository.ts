import { db } from '../../database';
import { UserEntity } from './user.entity';
import { mapUserRowToEntity, UserRow } from './user.mapper';

export class UserRepository {
  private tableName = 'users';

  async create(user: UserEntity): Promise<UserEntity | null> {
    const result = await db.query<UserRow>(
      `INSERT INTO ${this.tableName}(fullname, username, password) VALUES 
      ($1, $2, $3) RETURNING *`,
      [user.fullname, user.username, user.password],
    );

    const newUserRow = result.rows[0];
    if (!newUserRow) return null;

    return mapUserRowToEntity(newUserRow);
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const result = await db.query<UserRow>(`SELECT * FROM ${this.tableName} WHERE username=$1`, [
      username,
    ]);

    const existingUser = result.rows[0];
    if (!existingUser) return null;

    return mapUserRowToEntity(existingUser);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const result = await db.query<UserRow>(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);

    const existingUser = result.rows[0];
    if (!existingUser) return null;

    return mapUserRowToEntity(existingUser);
  }

  async delete(id: string): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
  }
}
