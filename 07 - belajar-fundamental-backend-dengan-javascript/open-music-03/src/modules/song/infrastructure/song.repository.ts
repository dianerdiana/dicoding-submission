import { db } from '../../../shared/libs/db';
import { Song } from '../domain/entities/song.entity';
import { SongId } from '../domain/value-objects/song-id.vo';
import { mapSongRowToEntity, SongRow } from './song.mapper';

export class SongRepository {
  async save(song: Song): Promise<void> {
    const primitive = song.toPrimitives();

    await db.query<SongRow>(
      `INSERT INTO songs (id, title, year, genre, performer, duration, album_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE
         SET title = EXCLUDED.title,
          year = EXCLUDED.year,
          genre = EXCLUDED.genre,
          performer = EXCLUDED.performer,
          duration = EXCLUDED.duration,
          album_id = EXCLUDED.album_id,
          updated_at = EXCLUDED.updated_at
         RETURNING *
         `,
      [
        primitive.id,
        primitive.title,
        primitive.year,
        primitive.genre,
        primitive.performer,
        primitive.duration,
        primitive.albumId,
        primitive.createdAt,
        primitive.updatedAt,
      ],
    );
  }

  async findAll(): Promise<Song[]> {
    const result = await db.query<SongRow>(`SELECT * FROM songs`);

    return result.rows.map((row) => mapSongRowToEntity(row));
  }

  async findById(songId: SongId): Promise<Song | null> {
    const result = await db.query<SongRow>(`SELECT * FROM songs WHERE id=$1`, [songId.toString()]);

    const songRow = result.rows[0];
    if (!songRow) return null;

    return mapSongRowToEntity(songRow);
  }

  async delete(song: Song): Promise<boolean> {
    await db.query(`DELETE FROM songs WHERE id=$1 RETURNING *`, [song.getId().toString()]);

    return true;
  }
}
