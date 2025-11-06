import { db } from '../../../shared/libs/db';
import { Album } from '../domain/entities/album.entity';
import { AlbumRow, mapAlbumRowToEntity } from './album.mapper';

export class AlbumRepository {
  async create(album: Album): Promise<Album | null> {
    const result = await db.query<AlbumRow>(
      `INSERT INTO albums(id,name,year,created_at,updated_at) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [
        album.getId().toString(),
        album.getName(),
        album.getYear(),
        album.getCreatedAt(),
        album.getUpdatedAt(),
      ],
    );

    const albumRow = result.rows[0];
    if (!albumRow) return null;

    return mapAlbumRowToEntity(albumRow);
  }

  async findById(album: Album): Promise<Album | null> {
    const result = await db.query<AlbumRow>(`SELECT * FROM albums WHERE id=$1`, [
      album.getId().toString(),
    ]);

    const albumRow = result.rows[0];
    if (!albumRow) return null;

    return mapAlbumRowToEntity(albumRow);
  }

  async update(album: Album): Promise<Album | null> {
    const result = await db.query<AlbumRow>(
      `UPDATE albums SET name=$1,year=$2,updated_at=$3 WHERE id=$4 RETURNING *`,
      [album.getName(), album.getYear(), album.getUpdatedAt(), album.getId().toString()],
    );

    const albumRow = result.rows[0];
    if (!albumRow) return null;

    return mapAlbumRowToEntity(albumRow);
  }

  async delete(album: Album): Promise<boolean> {
    await db.query(`DELETE FROM albums WHERE id=$1 RETURNING *`, [album.getId().toString()]);

    return true;
  }
}
