import z from 'zod';
import { createSongSchema, updateSongSchema } from './song.schema';
import { SongEntity } from './song.entity';

export type CreateSongDto = z.input<typeof createSongSchema>;
export type UpdateSongDto = z.input<typeof updateSongSchema>;
export type SongResponseDto = {
  song: SongEntity;
};
export type AllSongsResponseDto = {
  songs: SongEntity[];
};
