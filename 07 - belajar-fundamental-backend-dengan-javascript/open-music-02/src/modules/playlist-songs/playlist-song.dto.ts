import { GetOwnPlaylistResponseDto } from '../playlists/playlist.dto';
import { SongEntity } from '../songs/song.entity';

// Payload
export type AddSongToPlaylistPayloadDto = {
  playlistId: string;
  songId: string;
  authId: string;
};
export type DeleteSongInPlaylistPayloadDto = {
  playlistId: string;
  songId: string;
  authId: string;
};

// Response
export type AddSongToPlaylistResponseDto = { playlistSongId: string };
export type GetPlaylistWithAllSongsResponseDto = GetOwnPlaylistResponseDto & {
  playlist: {
    id: string;
    name: string;
    username: string;
    songs: Omit<
      SongEntity,
      'genre' | 'year' | 'albumId' | 'duration' | 'createdAt' | 'updatedAt'
    >[];
  };
};
