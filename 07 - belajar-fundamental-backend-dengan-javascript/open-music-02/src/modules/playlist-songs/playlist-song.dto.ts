export type PlaylistWithSongsDto = {
  id: string;
  title: string;
  performer: string;
};

export type AddSongToPlaylistDto = {
  playlistId: string;
  songId: string;
  owner: string;
};

export type NewPlaylistSongResponseDto = {
  playlistSongId: string;
};
