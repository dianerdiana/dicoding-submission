import { db } from '../../database';
import { AlbumEntity } from './album.entity';
import { mapAlbumRowToEntity } from './album.mapper';

export class AlbumRepository {
  private tableName = 'albums';

  async create(album: AlbumEntity): Promise<AlbumEntity | null> {
    let newAlbum = null;
    await db.transaction(async (client) => {
      const res = await client.query(
        `INSERT INTO ${this.tableName}(name,year) VALUES ($1,$2) RETURNING *`,
        [album.name, album.year],
      );

      newAlbum = res ? res.rows[0] : null;
    });
    return newAlbum ? mapAlbumRowToEntity(newAlbum) : null;
  }

  async findById(id: string): Promise<AlbumEntity | null> {
    let album = null;

    await db.transaction(async (client) => {
      const res = await client.query(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);
      album = res ? res.rows[0] : null;
    });
    return album ? mapAlbumRowToEntity(album) : null;
  }

  async update(id: string, album: AlbumEntity): Promise<AlbumEntity | null> {
    let updatedAlbum = null;

    await db.transaction(async (client) => {
      const res = await client.query(
        `UPDATE ${this.tableName} SET name=$1,year=$2 WHERE id=$3 RETURNING *`,
        [album.name, album.year, id],
      );
      updatedAlbum = res ? res.rows[0] : null;
    });

    return updatedAlbum ? mapAlbumRowToEntity(updatedAlbum) : null;
  }

  async delete(id: string): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
  }
}
