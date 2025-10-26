import z from 'zod';
import { createAlbumSchema, updateAlbumSchema } from './album.schema';
import { AlbumEntity } from './album.entity';
import { SongEntity } from '../songs/song.entity';

// Payload
export type CreateAlbumPayloadDto = z.infer<typeof createAlbumSchema>;
export type UpdateAlbumPayloadDto = z.infer<typeof updateAlbumSchema>;

// Response
export type CreateAlbumResponseDto = {
  albumId: string;
};

export type UpdateAlbumResponseDto = {
  album: AlbumEntity;
};

export type GetAllAlbumResponseDto = {
  album: AlbumEntity[];
};

export type GetAlbumByIdResponseDto = {
  album: AlbumEntity & { songs: SongEntity[] };
};
