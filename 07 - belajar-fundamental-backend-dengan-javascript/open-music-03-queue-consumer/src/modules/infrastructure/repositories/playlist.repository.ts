import { db } from '@shared/libs/db.js';
import { Playlist } from '../../domain/entities/playlist.entity.js';
import { mapPlaylistRowToEntity, type PlaylistRow } from '../mappers/playlist.mapper.js';

const TABLE_NAME = 'playlists';

export class PlaylistRepository {
  async findById(playlistId: string): Promise<Playlist | null> {
    const result = await db.query<PlaylistRow>(`SELECT * FROM ${TABLE_NAME} WHERE id=$1`, [
      playlistId,
    ]);

    const playlistRow = result.rows[0];
    if (!playlistRow) return null;

    return mapPlaylistRowToEntity(playlistRow);
  }
}
