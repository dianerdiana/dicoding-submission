export interface PlaylistSongEntity {
  id: string;
  playlistId: string;
  songId: string;
  createdAt: string;
  updatedAt: string;
}

export class PlaylistSong implements PlaylistSongEntity {
  id: string;
  playlistId: string;
  songId: string;
  createdAt: string;
  updatedAt: string;

  constructor({ id, playlistId, songId }: Omit<PlaylistSongEntity, 'createdAt' | 'updatedAt'>) {
    this.id = id;
    this.playlistId = playlistId;
    this.songId = songId;

    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  update({
    playlistId,
    songId,
  }: Partial<Omit<PlaylistSongEntity, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (playlistId !== undefined) this.playlistId = playlistId;
    if (songId !== undefined) this.songId = songId;

    this.updatedAt = new Date().toISOString();
  }
}
