import { db } from '../../database';
import { PlaylistSongActivity, PlaylistSongActivityEntity } from './playlist-song-activity.entity';
import {
  mapPlaylistSongActivityRowToEntity,
  PlaylistSongActivityRow,
} from './playlist-song-activity.mapper';

export class PlaylistSongActivityRepository {
  private tableName = 'playlist_song_activities';

  async create({
    playlistId,
    songId,
    userId,
    action,
  }: PlaylistSongActivity): Promise<PlaylistSongActivityEntity | null> {
    const result = await db.query<PlaylistSongActivityRow>(
      `INSERT INTO ${this.tableName}(playlist_id,song_id,user_id,action) 
      VALUES ($1,$2,$3,$4) RETURNING id`,
      [playlistId, songId, userId, action],
    );

    const activityRow = result.rows[0];
    if (!activityRow) return null;

    return mapPlaylistSongActivityRowToEntity(activityRow);
  }

  async findAllByPlaylistId(playlistId: string): Promise<PlaylistSongActivityEntity[]> {
    const result = await db.query<PlaylistSongActivityRow>(
      `SELECT * FROM ${this.tableName} WHERE playlist_id=$1`,
      [playlistId],
    );

    return result.rows.map((r) => mapPlaylistSongActivityRowToEntity(r));
  }
}
