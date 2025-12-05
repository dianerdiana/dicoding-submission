import { db } from '@shared/libs/db.js';
import { Song } from 'modules/domain/entities/song.entity.js';
import { mapSongRowToEntity, type SongRow } from '../mappers/song.mapper.js';

export class SongRepository {
  async findAllByIds(songIds: string[]): Promise<Song[]> {
    const result = await db.query<SongRow>(`SELECT * FROM songs WHERE id = ANY($1::text[])`, [
      songIds,
    ]);
    return result.rows.map((songRow: SongRow) => mapSongRowToEntity(songRow));
  }
}
