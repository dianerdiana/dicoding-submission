import { db } from '../../../shared/libs/db';
import { Album } from '../domain/entities/album.entity';
import { AlbumId } from '../domain/value-objects/album-id.vo';
import { AlbumRow, mapAlbumEntityToRow, mapAlbumRowToEntity } from './album.mapper';

export class AlbumRepository {
  async save(album: Album): Promise<void> {
    const mappedAlbum = mapAlbumEntityToRow(album);

    await db.query<AlbumRow>(
      `INSERT INTO albums (id, name, year, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE
       SET name = EXCLUDED.name, year = EXCLUDED.year, updated_at = EXCLUDED.updated_at
       RETURNING *
       `,
      [
        mappedAlbum.id,
        mappedAlbum.name,
        mappedAlbum.year,
        mappedAlbum.created_at,
        mappedAlbum.updated_at,
      ],
    );
  }

  async findById(albumId: AlbumId): Promise<Album | null> {
    const result = await db.query<AlbumRow>(`SELECT * FROM albums WHERE id=$1`, [
      albumId.toString(),
    ]);

    const albumRow = result.rows[0];
    if (!albumRow) return null;

    return mapAlbumRowToEntity(albumRow);
  }

  async delete(album: Album): Promise<boolean> {
    await db.query(`DELETE FROM albums WHERE id=$1 RETURNING *`, [album.getId().toString()]);

    return true;
  }
}
