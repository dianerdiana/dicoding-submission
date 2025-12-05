import { db } from '@shared/libs/db.js';
import { PlaylistSong } from '../../domain/entities/playlist-song.entity.js';
import {
  mapPlaylistSongRowToEntity,
  type PlaylistSongRow,
} from '../mappers/playlist-song.mapper.js';

export class PlaylistSongRepository {
  async findAllByPlaylistId(playlistId: string): Promise<PlaylistSong[]> {
    const result = await db.query<PlaylistSongRow>(
      `SELECT * FROM playlist_songs WHERE playlist_id = $1`,
      [playlistId]
    );
    return result.rows.map((playlistSongRow: PlaylistSongRow) =>
      mapPlaylistSongRowToEntity(playlistSongRow)
    );
  }
}
