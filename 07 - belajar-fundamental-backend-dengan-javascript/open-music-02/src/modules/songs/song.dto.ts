import z from 'zod';
import { createSongSchema, updateSongSchema } from './song.schema';
import { SongEntity } from './song.entity';

// Payload
export type CreateSongPayloadDto = z.input<typeof createSongSchema>;
export type UpdateSongPayloadDto = z.input<typeof updateSongSchema>;

// Response Dto
export type CreateSongResponseDto = { songId: string };
export type UpdateSongResponseDto = { song: SongEntity };
export type GetSongResponseDto = { song: SongEntity };
export type GetAllSongResponseDto = {
  songs: Omit<SongEntity, 'genre' | 'duration' | 'albumId' | 'year' | 'createdAt' | 'updatedAt'>[];
};
export type GetSongByIdsResponseDto = { songs: Omit<SongEntity, 'createdAt' | 'updatedAt'>[] };
