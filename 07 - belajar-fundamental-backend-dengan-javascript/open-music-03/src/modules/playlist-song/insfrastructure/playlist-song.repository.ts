import { db } from '../../../shared/libs/db';
import { PlaylistSong } from '../domain/entities/playlist-song.entity';
import { mapPlaylistSongRowToEntity, PlaylistSongRow } from './playlist-song.mapper';

export class PlaylistSongRepository {
  async save(playlistSong: PlaylistSong): Promise<void> {
    const primitive = playlistSong.toPrimitives();

    await db.query<PlaylistSongRow>(
      `INSERT INTO playlist_songs (id, playlist_id, song_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE
         SET
          playlist_id = EXCLUDED.playlist_id,
          song_id = EXCLUDED.song_id,
          updated_at = EXCLUDED.updated_at
         RETURNING *
         `,
      [
        primitive.id,
        primitive.playlistId,
        primitive.songId,
        primitive.createdAt,
        primitive.updatedAt,
      ],
    );
  }

  async findById(playlistSongId: string): Promise<PlaylistSong | null> {
    const result = await db.query<PlaylistSongRow>(`SELECT * FROM playlist_songs WHERE id=$1`, [
      playlistSongId,
    ]);

    const playlistSongRow = result.rows[0];
    if (!playlistSongRow) return null;

    return mapPlaylistSongRowToEntity(playlistSongRow);
  }

  async findAllByPlaylistId(playlistId: string): Promise<PlaylistSong[]> {
    const result = await db.query<PlaylistSongRow>(
      `SELECT * FROM playlist_songs WHERE playlist_id = $1`,
      [playlistId],
    );
    return result.rows.map((playlistSongRow) => mapPlaylistSongRowToEntity(playlistSongRow));
  }

  async findByIds(playlistSongIds: string[]): Promise<PlaylistSong[]> {
    const result = await db.query<PlaylistSongRow>(
      `SELECT * FROM playlist_songs WHERE id = ANY($1::text[])`,
      [playlistSongIds],
    );
    return result.rows.map((playlistSongRow) => mapPlaylistSongRowToEntity(playlistSongRow));
  }
}
