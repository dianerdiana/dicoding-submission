export type PlaylistWithSongsDTO = {
  id: string;
  title: string;
  performer: string;
};

export type AddSongToPlaylistDTO = {
  playlistId: string;
  songId: string;
  owner: string;
};

export type NewPlaylistSongResponseDTO = {
  playlistSongId: string;
};
