import { db } from '../../database';
import { AlbumEntity } from './album.entity';
import { AlbumRow, mapAlbumRowToEntity } from './album.mapper';

export class AlbumRepository {
  private tableName = 'albums';

  async create(album: AlbumEntity): Promise<AlbumEntity | null> {
    const result = await db.query<AlbumRow>(
      `INSERT INTO ${this.tableName}(name, year) VALUES ($1, $2) RETURNING *`,
      [album.name, album.year],
    );

    const newAlbumRow = result.rows[0];
    if (!newAlbumRow) return null;

    return mapAlbumRowToEntity(newAlbumRow);
  }

  async findById(id: string): Promise<AlbumEntity | null> {
    const result = await db.query<AlbumRow>(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);

    const existingAlbum = result.rows[0];
    if (!existingAlbum) return null;

    return mapAlbumRowToEntity(existingAlbum);
  }

  async update(id: string, album: AlbumEntity): Promise<AlbumEntity | null> {
    const result = await db.query<AlbumRow>(
      `UPDATE ${this.tableName} SET name=$1,year=$2 WHERE id=$3 RETURNING *`,
      [album.name, album.year, id],
    );

    const existingAlbum = result.rows[0];
    if (!existingAlbum) return null;

    return mapAlbumRowToEntity(existingAlbum);
  }

  async delete(id: string): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
  }
}
