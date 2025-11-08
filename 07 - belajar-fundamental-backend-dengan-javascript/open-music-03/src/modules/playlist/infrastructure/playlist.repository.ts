import { db } from '../../../shared/libs/db';
import { Playlist } from '../domain/entities/playlist.entity';
import { mapPlaylistRowToEntity, PlaylistRow } from './playlist.mapper';

export class PlaylistRepository {
  async save(playlist: Playlist): Promise<void> {
    const primitive = playlist.toPrimitives();

    await db.query<PlaylistRow>(
      `INSERT INTO playlists (id, name, owner, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE
         SET
          name = EXCLUDED.name,
          owner = EXCLUDED.owner,
          updated_at = EXCLUDED.updated_at
         RETURNING *
         `,
      [primitive.id, primitive.name, primitive.owner, primitive.createdAt, primitive.updatedAt],
    );
  }

  async findAll(userId: string): Promise<Playlist[]> {
    const result = await db.query<PlaylistRow>(`SELECT * FROM playlists WHERE owner=$1`, [userId]);
    return result.rows.map((r) => mapPlaylistRowToEntity(r));
  }

  async findById(playlistId: string): Promise<Playlist | null> {
    const result = await db.query<PlaylistRow>(`SELECT * FROM playlists WHERE id=$1`, [playlistId]);

    const playlistRow = result.rows[0];
    if (!playlistRow) return null;

    return mapPlaylistRowToEntity(playlistRow);
  }

  async delete(playlist: Playlist): Promise<boolean> {
    const primitive = playlist.toPrimitives();
    await db.query(`DELETE FROM playlists WHERE id=$1 RETURNING *`, [primitive.id]);

    return true;
  }
}
