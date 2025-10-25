import { db } from '../../database';
import { mapPlaylistSongRowToEntity, PlaylistSongRow } from './playlist-song.mapper';
import { PlaylistSongEntity } from './playlist-song.entity';
import { PlaylistWithSongsDto } from './playlist-song.dto';

export class PlaylistSongRepository {
  private tableName = 'playlist_songs';
  private playlistTableName = 'playlists';
  private songTableName = 'songs';

  async create(
    playlistSong: Omit<PlaylistSongEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PlaylistSongEntity | null> {
    const result = await db.query<PlaylistSongRow>(
      `INSERT INTO ${this.tableName}(playlist_id,song_id) VALUES 
      ($1, $2) RETURNING id`,
      [playlistSong.playlistId, playlistSong.songId],
    );

    const newPlaylistSongRow = result.rows[0];
    if (!newPlaylistSongRow) return null;

    return mapPlaylistSongRowToEntity(newPlaylistSongRow);
  }

  async findAllSongsByPlaylistId(playlistId: string) {
    const result = await db.query<PlaylistWithSongsDto>(
      `SELECT 
          s.id as "id",
          s.title,
          s.performer
        FROM ${this.songTableName} as s
          LEFT JOIN ${this.tableName} as ps ON ps.song_id=s.id
        WHERE ps.playlist_id=$1;
      `,
      [playlistId],
    );

    return result.rows;
  }

  async delete({ playlistId, songId }: { playlistId: string; songId: string }): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE playlist_id=$1 AND song_id=$2`, [
      playlistId,
      songId,
    ]);
  }
}
