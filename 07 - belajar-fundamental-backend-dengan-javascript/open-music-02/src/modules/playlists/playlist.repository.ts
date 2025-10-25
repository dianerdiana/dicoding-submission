import { db } from '../../database';
import { PlaylistEntity } from './playlist.entity';
import { mapPlaylistRowToEntity, PlaylistRow } from './playlist.mapper';

export class PlaylistRepository {
  private tableName = 'playlists';

  async create(playlist: PlaylistEntity): Promise<PlaylistEntity | null> {
    const result = await db.query<PlaylistRow>(
      `INSERT INTO ${this.tableName}(name,owner) VALUES 
      ($1, $2) RETURNING id`,
      [playlist.name, playlist.owner],
    );

    const newPlaylistRow = result.rows[0];
    if (!newPlaylistRow) return null;

    return mapPlaylistRowToEntity(newPlaylistRow);
  }

  async findAllPlaylists({
    name,
    owner,
  }: {
    name?: string;
    owner: string;
    username?: string;
  }): Promise<PlaylistEntity[]> {
    const conditions: string[] = [`owner='${owner}'`];
    const values: any[] = [];

    if (name) {
      values.push(`%${name.toLowerCase()}%`);
      conditions.push(`LOWER(name) LIKE $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM ${this.tableName} ${whereClause} ORDER BY created_at DESC;`;

    const result = await db.query<PlaylistRow>(query, values);
    return result.rows.map((row) => mapPlaylistRowToEntity(row));
  }

  async findById(id: string): Promise<PlaylistEntity | null> {
    const result = await db.query<PlaylistRow>(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);

    const existingPlaylist = result.rows[0];
    if (!existingPlaylist) return null;

    return mapPlaylistRowToEntity(existingPlaylist);
  }

  async update(id: string, playlist: PlaylistEntity): Promise<PlaylistEntity | null> {
    const result = await db.query<PlaylistRow>(
      `UPDATE ${this.tableName} SET name=$1,owner=$2 WHERE id=$3 RETURNING *`,
      [playlist.name, playlist.owner, id],
    );

    const existingPlaylist = result.rows[0];
    if (!existingPlaylist) return null;

    return mapPlaylistRowToEntity(existingPlaylist);
  }

  async delete(id: string): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
  }
}
