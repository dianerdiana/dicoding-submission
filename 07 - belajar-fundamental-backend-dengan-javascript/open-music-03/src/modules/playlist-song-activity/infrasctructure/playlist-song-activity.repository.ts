import { db } from '../../../shared/libs/db';
import { PlaylistSongActivity } from '../domain/entities/playlist-song-activity.entity';
import {
  PlaylistSongActivityRow,
  mapPlaylistSongActivityRowToEntity,
} from './playlist-song-activity.mapper';

const TABLE_NAME = 'playlist_song_activities';

export class PlaylistSongActivityRepository {
  async save(playlistSongActivity: PlaylistSongActivity): Promise<void> {
    const primitive = playlistSongActivity.toPrimitives();

    await db.query<PlaylistSongActivityRow>(
      `INSERT INTO ${TABLE_NAME} (id, playlist_id, song_id, user_id, action, time, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (id) DO UPDATE
           SET
            playlist_id = EXCLUDED.playlist_id,
            song_id = EXCLUDED.song_id,
            user_id = EXCLUDED.user_id,
            action = EXCLUDED.action,
            time = EXCLUDED.time,
            updated_at = EXCLUDED.updated_at
           RETURNING *
           `,
      [
        primitive.id,
        primitive.playlistId,
        primitive.songId,
        primitive.userId,
        primitive.action,
        primitive.time,
        primitive.createdAt,
        primitive.updatedAt,
      ],
    );
  }

  async findAllByPlaylistId(playlistId: string): Promise<PlaylistSongActivity[]> {
    const result = await db.query<PlaylistSongActivityRow>(
      `SELECT * FROM ${TABLE_NAME} WHERE playlist_id=$1`,
      [playlistId],
    );

    return result.rows.map((playlistSongActivityRow) =>
      mapPlaylistSongActivityRowToEntity(playlistSongActivityRow),
    );
  }
}
