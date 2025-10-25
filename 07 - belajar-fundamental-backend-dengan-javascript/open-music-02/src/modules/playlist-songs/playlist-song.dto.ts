import { SanitizedPlaylist } from '../playlists/playlist.dto';
import { SongDto } from '../songs/song.dto';

export type AddSongToPlaylistDto = {
  playlistId: string;
  songId: string;
  userId: string;
};

export type NewPlaylistSongResponseDto = {
  playlistSongId: string;
};

// Response Dto
export type PlaylistWithAllSongsDto = {
  playlist: SanitizedPlaylist & { songs: SongDto[] };
};
