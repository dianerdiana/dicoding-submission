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

  async findAll(): Promise<Playlist[]> {
    const result = await db.query<PlaylistRow>(`SELECT * FROM playlists`);
    return result.rows.map((r) => mapPlaylistRowToEntity(r));
  }
}
