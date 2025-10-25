import z from 'zod';
import { createSongSchema, updateSongSchema } from './song.schema';
import { SongEntity } from './song.entity';

export type CreateSongDTO = z.input<typeof createSongSchema>;
export type UpdateSongDTO = z.input<typeof updateSongSchema>;
export type SongResponseDTO = {
  song: SongEntity;
};
export type AllSongsResponseDTO = {
  songs: SongEntity[];
};
