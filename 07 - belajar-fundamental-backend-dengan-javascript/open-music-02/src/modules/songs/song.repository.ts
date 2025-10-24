import { db } from '../../database';
import { SongEntity } from './song.entity';
import { mapSongRowToEntity, SongRow } from './song.mapper';

export class SongRepository {
  private tableName = 'songs';

  async create(song: SongEntity): Promise<SongEntity | null> {
    const result = await db.query<SongRow>(
      `INSERT INTO ${this.tableName}(title,year,genre,performer,duration,album_id) VALUES 
      ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [song.title, song.year, song.genre, song.performer, song.duration, song.albumId],
    );

    const newSongRow = result.rows[0];
    if (!newSongRow) return null;

    return mapSongRowToEntity(newSongRow);
  }

  async findAllSongs({
    title,
    performer,
    albumId,
  }: {
    title?: string;
    performer?: string;
    albumId?: string;
  }): Promise<SongEntity[]> {
    const conditions: string[] = [];
    const values: any[] = [];

    if (title) {
      values.push(`%${title.toLowerCase()}%`);
      conditions.push(`LOWER(title) LIKE $${values.length}`);
    }

    if (performer) {
      values.push(`%${performer.toLowerCase()}%`);
      conditions.push(`LOWER(performer) LIKE $${values.length}`);
    }

    if (albumId) {
      values.push(albumId);
      conditions.push(`album_id = $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM ${this.tableName} ${whereClause} ORDER BY created_at DESC;`;

    const result = await db.query<SongRow>(query, values);
    return result.rows.map((row) => mapSongRowToEntity(row));
  }

  async findById(id: string): Promise<SongEntity | null> {
    const result = await db.query<SongRow>(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);

    const existingSong = result.rows[0];
    if (!existingSong) return null;

    return mapSongRowToEntity(existingSong);
  }

  async update(id: string, song: SongEntity): Promise<SongEntity | null> {
    const result = await db.query<SongRow>(
      `UPDATE ${this.tableName} SET title=$1,year=$2,genre=$3,performer=$4,duration=$5,album_id=$6 WHERE id=$7 RETURNING *`,
      [song.title, song.year, song.genre, song.performer, song.duration, song.albumId, id],
    );

    const existingSong = result.rows[0];
    if (!existingSong) return null;

    return mapSongRowToEntity(existingSong);
  }

  async delete(id: string): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
  }
}
