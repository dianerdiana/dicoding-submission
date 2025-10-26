import z from 'zod';
import { createSongSchema, updateSongSchema } from './song.schema';
import { SongEntity } from './song.entity';

export type CreateSongDto = z.input<typeof createSongSchema>;
export type UpdateSongDto = z.input<typeof updateSongSchema>;

// Response Dto
export type SongDto = SongEntity;
export type SongResponseDto = {
  song: SongEntity;
};
export type AllSongsResponseDto = {
  songs: SongEntity[];
};
export type SanitizedSongsResponseDto = {
  songs: Omit<SongEntity, 'createdAt' | 'updatedAt'>[];
};
